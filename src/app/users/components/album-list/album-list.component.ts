import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Subject, takeUntil, tap } from "rxjs";

import { RouterModule } from "@angular/router";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

import { MatButtonModule } from "@angular/material/button";

import { CardComponent } from "@src/app/components/card/card.component";

import { Album } from "../../types/album-models";
import { AlbumApiService } from "../../services/album-api.service";

@Component({
  selector: "app-album-list",
  templateUrl: "./album-list.component.html",
  styleUrls: ["./album-list.component.sass"],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    MatButtonModule,
    CardComponent,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumListComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  albums$!: Observable<Album[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private albumApiService: AlbumApiService,
    private translateService: TranslateService,
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const userId = Number(params.get("userId")) || null;
      if (userId) {
        this.albums$ = this.getAlbums(userId);
      } else {
        this.router.navigate(["/"]);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getAlbums(userId: number): Observable<Album[]> {
    return this.albumApiService.fetchAlbums(userId).pipe(
      tap((albums) => {
        if (albums.length === 0) {
          this.router.navigate(["/"]);
        }
      }),
    );
  }
}

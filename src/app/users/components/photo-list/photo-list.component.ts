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

import { Photo } from "../../types/album-models";
import { AlbumApiService } from "../../services/album-api.service";

@Component({
  selector: "app-photo-list",
  templateUrl: "./photo-list.component.html",
  styleUrls: ["./photo-list.component.sass"],
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
export class PhotoListComponent {
  private readonly destroy$ = new Subject<void>();
  photos$!: Observable<Photo[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private albumApiService: AlbumApiService,
    private translateService: TranslateService,
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const userId = Number(params.get("userId")) || null;
      const albumId = Number(params.get("albumId")) || null;
      if (!userId || !albumId) {
        this.router.navigate(["/"]);
      } else {
        this.photos$ = this.getPhotos(albumId);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getPhotos(albumId: number): Observable<Photo[]> {
    return this.albumApiService.fetchPhotos(albumId).pipe(
      tap((photos) => {
        if (photos.length === 0) {
          this.router.navigate(["/"]);
        }
      }),
    );
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { CommonModule } from "@angular/common";

import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { RouterModule } from "@angular/router";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

import { FormGroup } from "@angular/forms";

import { MatAccordion, MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

import { UserDialogComponent } from "../user-dialog/user-dialog.component";

import { User } from "../../types/user-models";
import { UserApiService } from "../../services/user-api.service";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.sass"],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  users$!: Observable<User[]>;

  constructor(
    private userApiService: UserApiService,
    private translateService: TranslateService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.users$ = this.getUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      maxWidth: "100vw",
      maxHeight: "100vh",
      width: "70vw",
      data: {
        dialogData: {},
      },
    });
    dialogRef.componentInstance.saveClicked
      .pipe(takeUntil(this.destroy$))
      .subscribe((userForm: FormGroup) => {
        if (userForm.valid) {
          const newUserData = userForm.value as User;
          this.addUser(newUserData).subscribe(
            () => {
              this.openSnackBar(
                this.translateService.instant("users.userAdded"),
              );
              dialogRef.close();
            },
            (error) => {
              console.error("API Error:", error);
            },
          );
        }
      });
  }

  openEditDialog(userForEdit: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      maxWidth: "100vw",
      maxHeight: "100vh",
      width: "70vw",
      data: userForEdit,
    });

    dialogRef.componentInstance.saveClicked
      .pipe(takeUntil(this.destroy$))
      .subscribe((userForm: FormGroup) => {
        if (userForm.valid) {
          const updatedUserData = userForm.value as User;
          this.updateUser(userForEdit.id, updatedUserData).subscribe(
            () => {
              this.openSnackBar(
                this.translateService.instant("users.userUpdated"),
              );
              dialogRef.close();
            },
            (error) => {
              console.error("API Error:", error);
            },
          );
        }
      });
  }

  private getUsers(): Observable<User[]> {
    return this.userApiService.fetchUsers();
  }

  private addUser(newUserData: User): Observable<User> {
    return this.userApiService
      .addUser(newUserData)
      .pipe(takeUntil(this.destroy$));
  }

  private updateUser(userId: number, newUserData: User): Observable<User> {
    return this.userApiService
      .updateUser(userId, newUserData)
      .pipe(takeUntil(this.destroy$));
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, "", {
      duration: 3000,
      panelClass: ["text-center"],
    });
  }
}

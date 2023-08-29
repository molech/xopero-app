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

import { FormGroup } from "@angular/forms";

import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

import { TodoDialogComponent } from "../todo-dialog/todo-dialog.component";

import { CardComponent } from "@src/app/components/card/card.component";

import { Todo } from "../../types/todo-models";
import { TodoApiService } from "../../services/todo-api.service";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.sass"],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CardComponent,
    MatSnackBarModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  todos$!: Observable<Todo[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todoApiService: TodoApiService,
    private translateService: TranslateService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const userId = Number(params.get("userId")) || null;
      if (userId) {
        this.todos$ = this.getTodos(userId);
      } else {
        this.router.navigate(["/"]);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      maxWidth: "100vw",
      maxHeight: "100vh",
      width: "50vw",
      data: {
        dialogData: {},
      },
    });
    dialogRef.componentInstance.saveClicked
      .pipe(takeUntil(this.destroy$))
      .subscribe((todoForm: FormGroup) => {
        if (todoForm.valid) {
          const newTodoData = todoForm.value as Todo;
          this.addTodo(newTodoData).subscribe(
            () => {
              this.openSnackBar(
                this.translateService.instant("todos.todoAdded"),
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

  openEditDialog(todoForEdit: Todo): void {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      maxWidth: "100vw",
      maxHeight: "100vh",
      width: "50vw",
      data: todoForEdit,
    });

    dialogRef.componentInstance.saveClicked
      .pipe(takeUntil(this.destroy$))
      .subscribe((todoForm: FormGroup) => {
        if (todoForm.valid) {
          const updatedTodoData = todoForm.value as Todo;
          this.updateTodo(todoForEdit.id, updatedTodoData).subscribe(
            () => {
              this.openSnackBar(
                this.translateService.instant("todos.todoUpdated"),
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

  private getTodos(userId: number): Observable<Todo[]> {
    return this.todoApiService.fetchTodos(userId).pipe(
      tap((todos) => {
        if (todos.length === 0) {
          this.router.navigate(["/"]);
        }
      }),
    );
  }

  private addTodo(newTodoData: Todo): Observable<Todo> {
    return this.todoApiService
      .addTodo(newTodoData)
      .pipe(takeUntil(this.destroy$));
  }

  private updateTodo(todoId: number, newTodoData: Todo): Observable<Todo> {
    return this.todoApiService
      .updateTodo(todoId, newTodoData)
      .pipe(takeUntil(this.destroy$));
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, "", {
      duration: 3000,
      panelClass: ["text-center"],
    });
  }
}

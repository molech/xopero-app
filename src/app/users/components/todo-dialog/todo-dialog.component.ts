import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  Inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { TranslateModule } from "@ngx-translate/core";

import { MatDialogModule } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";

import { Todo } from "../../types/todo-models";

@Component({
  selector: "app-todo-dialog",
  templateUrl: "./todo-dialog.component.html",
  styleUrls: ["./todo-dialog.component.sass"],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoDialogComponent {
  @Output() saveClicked: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();

  todoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dialogData: Partial<Todo>,
  ) {
    this.todoForm = this.fb.group({
      title: new FormControl(this.dialogData.title || "", [
        Validators.required,
      ]),
      completed: new FormControl(this.dialogData.completed || false, [
        Validators.required,
      ]),
    });
  }

  onSaveClick() {
    if (this.todoForm.valid) {
      const updatedTodo = {
        ...this.dialogData,
        ...this.todoForm.value,
      };
      this.saveClicked.emit(this.todoForm);
    }
  }
}

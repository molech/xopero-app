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

import { User } from "../../types/user-models";

@Component({
  selector: "app-user-dialog",
  templateUrl: "./user-dialog.component.html",
  styleUrls: ["./user-dialog.component.sass"],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDialogComponent {
  @Output() saveClicked: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dialogData: Partial<User>,
  ) {
    this.userForm = this.fb.group({
      name: new FormControl(this.dialogData.name || "", [Validators.required]),
      username: new FormControl(this.dialogData.username || "", [
        Validators.required,
      ]),
      email: new FormControl(this.dialogData.email || "", [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  onSaveClick() {
    if (this.userForm.valid) {
      const updatedUser = {
        ...this.dialogData,
        ...this.userForm.value,
      };
      this.saveClicked.emit(this.userForm);
    }
  }
}

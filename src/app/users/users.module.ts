import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";

import { MatDialogModule } from "@angular/material/dialog";

import { UsersRoutingModule } from "./users-routing.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TranslateModule,
    RouterModule,
    MatDialogModule,
  ],
})
export class UsersModule {}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UsersComponent } from "./components/users/users.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { AlbumListComponent } from "./components/album-list/album-list.component";
import { PhotoListComponent } from "./components/photo-list/photo-list.component";

const routes: Routes = [
  {
    path: "",
    component: UsersComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        component: UserListComponent,
      },
      {
        path: ":userId/todos",
        pathMatch: "full",
        component: TodoListComponent,
      },
      {
        path: ":userId/albums",
        pathMatch: "full",
        component: AlbumListComponent,
      },
      {
        path: ":userId/albums/:albumId/photos",
        pathMatch: "full",
        component: PhotoListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}

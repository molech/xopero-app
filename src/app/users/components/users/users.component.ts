import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterModule } from "@angular/router";

import { NavbarComponent } from "@src/app/components/navbar/navbar.component";
import { FooterComponent } from "@src/app/components/footer/footer.component";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.sass"],
  imports: [RouterModule, NavbarComponent, FooterComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {}

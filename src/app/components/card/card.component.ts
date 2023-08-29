import { ChangeDetectionStrategy, Component } from "@angular/core";

import { MatCardModule } from "@angular/material/card";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.sass"],
  standalone: true,
  imports: [MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {}

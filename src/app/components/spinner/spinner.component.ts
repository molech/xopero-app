import { Component, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoaderService } from "@src/app/services/loader/loader.service";

@Component({
  selector: "app-spinner",
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.sass"],
  imports: [CommonModule],
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class SpinnerComponent {
  constructor(public loader: LoaderService) {}
}

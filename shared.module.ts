import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinerComponent } from "./loading-spinner/loading-spiner/loading-spiner.component";
import { PlaceHolderDirective } from "./placeholder/placeholder";

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinerComponent,
    PlaceHolderDirective,
    DropdownDirective,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    LoadingSpinerComponent,
    PlaceHolderDirective,
    DropdownDirective,
    CommonModule,
  ],
})
export class SharedModule {}

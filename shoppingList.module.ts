import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListRoutingModule } from "./shoppinglist-Routing.module";

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    ShoppingListRoutingModule,

    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class ShoppingListModule {}

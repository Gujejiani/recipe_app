import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorage } from "../shared/data-storage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSab: Subscription;
  isAuthenticated: boolean = false;
  constructor(
    private dataStorage: DataStorage,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSab = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
    });
  }
  ngOnDestroy() {
    this.userSab.unsubscribe();
  }
  onSaveData() {
    this.dataStorage.storeRecipes();
  }

  onFetchData() {
    this.dataStorage.fetchRecipes().subscribe();
  }
  onLogOut() {
    this.authService.logOut();
  }
}

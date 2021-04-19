import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder";
import { AuthService } from "./auth.service";
import { AuthResponseData } from "./auth.service";
@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  errorMessage: string = "";
  closeSub: Subscription;
  @ViewChild("form") formData: NgForm;
  @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;
  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    const { email, password } = this.formData.value;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }
    authObs.subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(["/recipes"]);
      },
      (errorMessage) => {
        this.isLoading = false;
        this.errorMessage = errorMessage;
        this.showErrorAlert(errorMessage);
        console.log(errorMessage);
      }
    );

    this.formData.reset();
  }
  closeModal() {
    this.errorMessage = "";
  }
  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );

    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.closeModal.subscribe((data) => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}

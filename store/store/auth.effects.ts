import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { AuthResponseData } from "../auth.service";
import * as AuthActions from "./auth.actions";

@Injectable()
export class AuthEffect {
  @Effect() // I think this guy gives error
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvalLKEEXfR3psxD8jmd_ynDFpBfVdAlc",
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map((resData) => {
            const expirationDate = new Date(
              new Date().getTime() + +resData.expiresIn * 1000
            );
            return of(
              new AuthActions.Login({
                email: resData.email,
                userId: resData.localId,
                token: resData.idToken,
                expirationDate: expirationDate,
              })
            );
          }),

          catchError((error) => {
            // ..error handling
            return of();
          })
        );
    })
  );
  constructor(private actions$: Actions, private http: HttpClient) {}
}

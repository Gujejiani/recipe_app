import { User } from "../user.model";
import { AuthActions } from "./auth.actions";
import * as ActionTypes from "./auth.actions";
export interface State {
  user: User;
}

const initialState: State = {
  user: null,
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case ActionTypes.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.token,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user: user,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}

import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { GoogleUser } from '../models/googleUser';
import { UserInfo, UserLogOut } from './auth.actions';
import { AuthService } from './auth.service';
import { patch } from '@ngxs/store/operators';

export interface AuthStateModel {
  googleUser: GoogleUser;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    googleUser: null as any,
  },
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService, private store: Store) {}

  @Selector()
  static loggedInUser(state: AuthStateModel): GoogleUser {
    return state?.googleUser;
  }

  // @Action(UserInfo())
  // fetch(ctx: StateContext<AuthStateModel>, action: UserInfo) {
  //   return this.authService.GetUserInfo(action.token).pipe(
  //     tap((user) => {
  //       localStorage.setItem('token', action.token);
  //       ctx.setState(
  //         patch<AuthStateModel>({
  //           googleUser: user,
  //         })
  //       );
  //     })
  //   );
  // }

  @Action(UserLogOut)
  logout(ctx: StateContext<AuthStateModel>, action: UserInfo) {
    return ctx.setState(patch<AuthStateModel>({ googleUser: undefined }));
  }
}

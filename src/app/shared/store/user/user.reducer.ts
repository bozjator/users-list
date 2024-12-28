import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';

export interface UserState {
  deletingUser: boolean;
  successfullyDeletedUser: boolean;
  errorDeleteUser?: HttpErrorResponse;
}

const initialState: UserState = {
  deletingUser: false,
  successfullyDeletedUser: false,
  errorDeleteUser: undefined,
};

export const userReducer = createReducer(
  initialState,

  on(UserActions.deleteUser, (state, action): UserState => {
    return {
      ...state,
      deletingUser: true,
      successfullyDeletedUser: false,
      errorDeleteUser: undefined,
    };
  }),

  on(UserActions.deleteUserSuccess, (state, action): UserState => {
    return {
      ...state,
      deletingUser: false,
      successfullyDeletedUser: true,
    };
  }),

  on(UserActions.deleteUserFailure, (state, action): UserState => {
    return {
      ...state,
      deletingUser: false,
      errorDeleteUser: action.error,
    };
  })
);

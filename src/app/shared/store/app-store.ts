import { ActionReducerMap } from '@ngrx/store';
import { userReducer, UserState } from './user/user.reducer';
import { usersReducer, UsersState } from './users/users.reducer';
import { UserEffects } from './user/user.effects';
import { UsersEffects } from './users/users.effects';

/**
 * In how many minutes should cache expire.
 */
export const storeSectionExpires = {
  users: 15,
};

export const storeSectionName = {
  user: 'user',
  users: 'users',
};

export interface AppState {
  user: UserState;
  users: UsersState;
}

export const appReducers: ActionReducerMap<AppState> = {
  user: userReducer,
  users: usersReducer,
};

export const appEffects = [UserEffects, UsersEffects];

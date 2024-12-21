import { ActionReducerMap } from '@ngrx/store';
import { usersReducer, UsersState } from './users/users.reducer';
import { UsersEffects } from './users/users.effects';

/**
 * In how many minutes should cache expire.
 */
export const storeSectionExpires = {
  users: 15,
};

export const storeSectionName = {
  users: 'users',
};

export interface AppState {
  users: UsersState;
}

export const appReducers: ActionReducerMap<AppState> = {
  users: usersReducer,
};

export const appEffects = [UsersEffects];

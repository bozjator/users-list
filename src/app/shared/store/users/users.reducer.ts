import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { HashUtils } from '../../services/hash-utils.service';
import { DateUtils } from '../../services/date-utils.service';
import { storeSectionExpires } from '../app-store';
import { UsersActions } from './users.actions';
import { PaginatedList } from '../../models/other/paginated-list.model';
import { User } from '../../models/users/user.model';
import { StateClearedReason } from '../../models/other/state-clear-reason.enum';

export interface UsersState {
  stateClearedReason?: StateClearedReason;

  expiry: { [queryHash: string]: number };
  users: { [queryHash: string]: PaginatedList<User> };
  loadingUsers: boolean;
  errorLoadingUsers?: HttpErrorResponse;
}

const initialState: UsersState = {
  stateClearedReason: undefined,

  expiry: {},
  users: {},
  loadingUsers: false,
  errorLoadingUsers: undefined,
};

export const usersReducer = createReducer(
  initialState,

  on(UsersActions.clearState, (state, action): UsersState => {
    return { ...initialState, stateClearedReason: action.reason };
  }),

  on(UsersActions.loadUsers, (state, action): UsersState => {
    return {
      ...state,
      stateClearedReason: undefined,
      loadingUsers: true,
      errorLoadingUsers: undefined,
    };
  }),

  on(UsersActions.loadUsersSuccess, (state, action): UsersState => {
    const queryHashKey = HashUtils.generateHashKey(action.query);
    const expiresAt = DateUtils.addMinutesToDate(storeSectionExpires.users);
    return {
      ...state,
      loadingUsers: false,
      users: {
        ...state.users,
        [queryHashKey]: action.data,
      },
      expiry: {
        ...state.expiry,
        [queryHashKey]: expiresAt.getTime(),
      },
    };
  }),

  on(UsersActions.loadUsersFailure, (state, action): UsersState => {
    return {
      ...state,
      loadingUsers: false,
      errorLoadingUsers: action.error,
    };
  })
);

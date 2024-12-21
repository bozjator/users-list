import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { UsersQuery } from '../../models/users/users-query.model';
import { PaginatedList } from '../../models/other/paginated-list.model';
import { User } from '../../models/users/user.model';

const clearState = createAction('[Users] Clear State');

const loadUsers = createAction(
  '[Users] Load Users',
  props<{ query: UsersQuery }>()
);

const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ query: UsersQuery; data: PaginatedList<User> }>()
);

const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: HttpErrorResponse }>()
);

const UsersActions = {
  clearState,
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
};
export { UsersActions };

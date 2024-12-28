import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

const deleteUser = createAction('[User] Delete User', props<{ id: number }>());

const deleteUserSuccess = createAction('[User] Delete User Success');

const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: HttpErrorResponse }>()
);

const UserActions = {
  deleteUser,
  deleteUserSuccess,
  deleteUserFailure,
};
export { UserActions };

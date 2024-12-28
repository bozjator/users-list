import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { UsersApiService } from '../../services/api/users-api.service';
import { UserActions } from './user.actions';
import { UsersActions } from '../users/users.actions';
import { StateClearedReason } from '../../models/other/state-clear-reason.enum';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private usersApiService = inject(UsersApiService);

  deleteUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.deleteUser),
        exhaustMap((action) =>
          this.usersApiService.deleteUser(action.id).pipe(
            map(() => UserActions.deleteUserSuccess()),
            catchError((error) => of(UserActions.deleteUserFailure({ error })))
          )
        )
      ),
    { dispatch: true }
  );

  deleteUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.deleteUserSuccess),
        map(() =>
          UsersActions.clearState({ reason: StateClearedReason.deletedItem })
        )
      ),
    { dispatch: true }
  );
}

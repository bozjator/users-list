import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { UsersApiService } from '../../services/api/users-api.service';
import { UsersActions } from './users.actions';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private usersApiService = inject(UsersApiService);

  loadUsers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.loadUsers),
        mergeMap((action) =>
          this.usersApiService.getUsersList(action.query).pipe(
            map((data) =>
              UsersActions.loadUsersSuccess({
                query: action.query,
                data,
              })
            ),
            catchError((error) => of(UsersActions.loadUsersFailure({ error })))
          )
        )
      ),
    { dispatch: true }
  );
}

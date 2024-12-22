import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  filter,
  Observable,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { AppState } from '../../shared/store/app-store';
import { UsersSelectors } from '../../shared/store/users/users.selectors';
import { UsersQuery } from '../../shared/models/users/users-query.model';
import { UsersActions } from '../../shared/store/users/users.actions';
import { PaginatedList } from '../../shared/models/other/paginated-list.model';
import { User } from '../../shared/models/users/user.model';
import { TableUsersComponent } from './components/table-users.component';
import { PaginationComponent } from '../../shared/components/pagination.component';

@Component({
  selector: 'users',
  standalone: true,
  templateUrl: './users.component.html',
  imports: [CommonModule, TableUsersComponent, PaginationComponent],
})
export class UsersComponent {
  usersQuery$ = new BehaviorSubject<UsersQuery>({
    _page: 1,
    _per_page: 5,
  });

  users$: Observable<PaginatedList<User>>;
  loadingUsers$: Observable<boolean>;
  errorLoadingUsers$: Observable<HttpErrorResponse | undefined>;

  constructor(private store: Store<AppState>) {
    this.users$ = this.usersQuery$.pipe(
      switchMap((query: UsersQuery) => {
        return this.store.select(UsersSelectors.users(query)).pipe(
          tap((data) => {
            if (!data) this.store.dispatch(UsersActions.loadUsers({ query }));
          }),
          filter((data) => !!data),
          take(1)
        );
      }),
      shareReplay(1)
    );
    this.loadingUsers$ = this.store.select(UsersSelectors.loadingUsers);
    this.errorLoadingUsers$ = this.store.select(
      UsersSelectors.errorLoadingUsers
    );
  }

  private updateUsersQuery(newData: Partial<UsersQuery>) {
    const currentData = this.usersQuery$.value;
    this.usersQuery$.next({ ...currentData, ...newData });
  }

  changePageNumber(pageNumber: number): void {
    this.updateUsersQuery({ _page: pageNumber });
  }
}

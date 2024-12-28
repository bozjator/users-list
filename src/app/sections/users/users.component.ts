import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  Observable,
  shareReplay,
  skip,
  Subject,
  switchMap,
  take,
  takeUntil,
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
import { StateClearedReason } from '../../shared/models/other/state-clear-reason.enum';

@Component({
  selector: 'users',
  standalone: true,
  templateUrl: './users.component.html',
  imports: [CommonModule, TableUsersComponent, PaginationComponent],
})
export class UsersComponent implements OnInit, OnDestroy {
  private readonly unsubscribeAll$: Subject<any> = new Subject();

  usersQuery$ = new BehaviorSubject<UsersQuery>({
    _page: 1,
    _per_page: 5,
  });

  users$?: Observable<PaginatedList<User>>;
  loadingUsers$?: Observable<boolean>;
  errorLoadingUsers$?: Observable<HttpErrorResponse | undefined>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.setupLoadingAndErrorObservers();
    this.setupUsersObserver();
    this.setupUsersStateClearedObserver();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next(null);
    this.unsubscribeAll$.complete();
  }

  private setupLoadingAndErrorObservers(): void {
    this.loadingUsers$ = this.store.select(UsersSelectors.loadingUsers);
    this.errorLoadingUsers$ = this.store.select(
      UsersSelectors.errorLoadingUsers
    );
  }

  private setupUsersObserver() {
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
  }

  private setupUsersStateClearedObserver() {
    this.store
      .select(UsersSelectors.stateClearedReason)
      .pipe(
        takeUntil(this.unsubscribeAll$),
        skip(1),
        filter((reason) => !!reason)
      )
      .subscribe((reason) => this.reloadUsersBasedOnStateClearedReason(reason));
  }

  private reloadUsersBasedOnStateClearedReason(reason: StateClearedReason) {
    if (reason !== StateClearedReason.deletedItem) {
      this.reloadCurrentPageData();
      return;
    }

    if (!this.users$) return;

    combineLatest([this.users$, this.usersQuery$])
      .pipe(take(1))
      .subscribe(([usersList, pagination]) => {
        const recordsOnCurrentPage = usersList.data.length;
        const currentPage = pagination._page;

        // Go to the previous page if this was the last item on the current page.
        if (recordsOnCurrentPage === 1 && currentPage > 1)
          this.changePageNumber(currentPage - 1);
        else this.reloadCurrentPageData();
      });
  }

  private updateUsersQuery(newData: Partial<UsersQuery>) {
    const currentData = this.usersQuery$.value;
    this.usersQuery$.next({ ...currentData, ...newData });
  }

  private reloadCurrentPageData() {
    const currentQuery = this.usersQuery$.value;
    this.usersQuery$.next({ ...currentQuery });
  }

  changePageNumber(pageNumber: number): void {
    this.updateUsersQuery({ _page: pageNumber });
  }
}

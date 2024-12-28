import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../shared/store/app-store';
import { TableComponent } from '../../../shared/components/table.component';
import { TableColumn } from '../../../shared/models/other/table-column.model';
import { User } from '../../../shared/models/users/user.model';
import { UserActions } from '../../../shared/store/user/user.actions';

@Component({
  standalone: true,
  selector: 'table-users',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableComponent],
  template: `<app-table
    [columns]="columns"
    [data]="data"
    [deleteFn]="deleteFn"
  />`,
})
export class TableUsersComponent {
  @Input() data: User[] = [];

  columns: TableColumn<User>[] = [
    {
      title: 'First name',
      propertyKey: 'first_name',
    },
    {
      title: 'Last name',
      propertyKey: 'last_name',
    },
    {
      title: 'Email',
      propertyKey: 'email',
    },
    {
      title: 'Role',
      propertyKey: 'role',
    },
  ];

  constructor(private store: Store<AppState>) {}

  deleteFn = (user: User) => {
    this.store.dispatch(UserActions.deleteUser({ id: user.id }));
  };
}

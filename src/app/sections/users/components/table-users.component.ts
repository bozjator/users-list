import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TableComponent } from '../../../shared/components/table.component';
import { TableColumn } from '../../../shared/models/other/table-column.model';
import { User } from '../../../shared/models/users/user.model';

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

  deleteFn = (user: User) => {
    // TODO delete user
    console.log('delete user: ', user);
  };
}

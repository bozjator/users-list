import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn } from '../models/other/table-column.model';

@Component({
  standalone: true,
  selector: 'app-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <table>
      <thead>
        <tr>
          <th *ngFor="let column of columns">
            {{ column.title }}
          </th>
          <th *ngIf="deleteFn"></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of data">
          <td *ngFor="let column of columns">
            {{ item[column.propertyKey] }}
          </td>
          <td *ngIf="deleteFn">
            <button (click)="deleteFn(item)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class TableComponent<T> {
  @Input() data: T[] = [];
  @Input() columns: TableColumn<T>[] = [];
  @Input() deleteFn?: (item: T) => void;
}

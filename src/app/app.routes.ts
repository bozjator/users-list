import { Routes } from '@angular/router';
import { UsersComponent } from './sections/users/users.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: '**',
    component: UsersComponent,
  },
];

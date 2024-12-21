import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppHttpService } from './app-http.service';
import { UsersQuery } from '../../models/users/users-query.model';
import { User } from '../../models/users/user.model';
import { PaginatedList } from '../../models/other/paginated-list.model';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService extends AppHttpService {
  constructor() {
    super('users');
  }

  public getUsersList(query: UsersQuery): Observable<PaginatedList<User>> {
    const params = this.toHttpParams(query);
    return this.http.get<PaginatedList<User>>(this.url(''), { params });
  }

  public deleteUser(id: number): Observable<number> {
    return this.http.delete<number>(this.url(id.toString()));
  }
}

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeSectionName } from '../app-store';
import { UsersState } from './users.reducer';
import { HashUtils } from '../../services/hash-utils.service';
import { UsersQuery } from '../../models/users/users-query.model';
import { PaginatedList } from '../../models/other/paginated-list.model';
import { User } from '../../models/users/user.model';

const featureState = createFeatureSelector<UsersState>(storeSectionName.users);

const users = (query: UsersQuery) =>
  createSelector(featureState, (state): PaginatedList<User> | undefined => {
    const hashKey = HashUtils.generateHashKey(query);
    const users = state.users[hashKey];

    if (!users) return undefined;

    const expiresAt = state.expiry[hashKey];
    return Date.now() < expiresAt ? users : undefined;
  });

const loadingUsers = createSelector(
  featureState,
  (state) => state.loadingUsers
);

const errorLoadingUsers = createSelector(
  featureState,
  (state) => state.errorLoadingUsers
);

const UsersSelectors = {
  users,
  loadingUsers,
  errorLoadingUsers,
};
export { UsersSelectors };

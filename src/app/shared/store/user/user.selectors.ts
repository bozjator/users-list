import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeSectionName } from '../app-store';
import { UserState } from './user.reducer';

const featureState = createFeatureSelector<UserState>(storeSectionName.user);

const deletingUser = createSelector(
  featureState,
  (state) => state.deletingUser
);

const successfullyDeletedUser = createSelector(
  featureState,
  (state) => state.successfullyDeletedUser
);

const errorDeleteUser = createSelector(
  featureState,
  (state) => state.errorDeleteUser
);

const UserSelectors = {
  deletingUser,
  successfullyDeletedUser,
  errorDeleteUser,
};
export { UserSelectors };

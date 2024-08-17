import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const authFeatureSelector = createFeatureSelector<AuthState>('auth');

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (state: AuthState) => !!state.token
);

export const isLoadingSelector = createSelector(
  authFeatureSelector,
  (state: AuthState) => state.loading
);

export const errorMessageSelector = createSelector(
  authFeatureSelector,
  (state: AuthState) => state.error !== null
);

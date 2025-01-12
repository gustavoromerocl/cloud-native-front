import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SessionState } from './session.reducer';

export const selectSessionState = createFeatureSelector<SessionState>('session');

export const selectIsLoggedIn = createSelector(
  selectSessionState,
  (state: SessionState) => state.isLoggedIn
);

export const selectUser = createSelector(
  selectSessionState,
  (state: SessionState) => state.user
);

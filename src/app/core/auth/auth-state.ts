import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

interface AuthStateModel {
  user: AuthUser | null;
}

const initialState: AuthStateModel = {
  user: null,
};

export const AuthState = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ user }) => ({
    isAuthenticated: computed(() => user() !== null),
  })),
  withMethods((store) => ({
    setUser(user: AuthUser): void {
      patchState(store, { user });
    },
    clearUser(): void {
      patchState(store, initialState);
    },
  })),
);

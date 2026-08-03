import { TestBed } from '@angular/core/testing';

import { AuthState, AuthUser } from '@core/auth/auth-state';

describe('AuthState', () => {
  let store: InstanceType<typeof AuthState>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(AuthState);
  });

  it('starts unauthenticated', () => {
    expect(store.user()).toBeNull();
    expect(store.isAuthenticated()).toBe(false);
  });

  it('sets the authenticated user', () => {
    const user: AuthUser = {
      id: 'user-1',
      email: 'user@example.com',
      name: 'Example User',
    };

    store.setUser(user);

    expect(store.user()).toEqual(user);
    expect(store.isAuthenticated()).toBe(true);
  });

  it('clears the authenticated user', () => {
    store.setUser({
      id: 'user-1',
      email: 'user@example.com',
      name: 'Example User',
    });

    store.clearUser();

    expect(store.user()).toBeNull();
    expect(store.isAuthenticated()).toBe(false);
  });
});

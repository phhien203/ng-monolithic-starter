import { DOCUMENT } from '@angular/common';
import { DestroyRef, Service, computed, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';
export type ThemePreference = Theme | 'system';

const THEME_STORAGE_KEY = 'theme';
const SYSTEM_THEME_QUERY = '(prefers-color-scheme: dark)';

@Service()
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly systemThemeQuery = this.document.defaultView?.matchMedia?.(SYSTEM_THEME_QUERY);
  private readonly systemThemeState = signal<Theme>(
    this.systemThemeQuery?.matches ? 'dark' : 'light',
  );
  private readonly preferenceState = signal<ThemePreference>(this.getInitialPreference());

  readonly preference = this.preferenceState.asReadonly();
  readonly resolvedTheme = computed<Theme>(() => {
    const preference = this.preferenceState();
    return preference === 'system' ? this.systemThemeState() : preference;
  });
  readonly isDark = computed(() => this.resolvedTheme() === 'dark');

  constructor() {
    this.applyTheme(this.resolvedTheme());

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      this.systemThemeState.set(event.matches ? 'dark' : 'light');

      if (this.preferenceState() === 'system') {
        this.applyTheme(this.resolvedTheme());
      }
    };

    this.systemThemeQuery?.addEventListener('change', handleSystemThemeChange);
    this.destroyRef.onDestroy(() =>
      this.systemThemeQuery?.removeEventListener('change', handleSystemThemeChange),
    );
  }

  setTheme(preference: ThemePreference): void {
    this.preferenceState.set(preference);
    this.applyTheme(this.resolvedTheme());
    this.persistPreference(preference);
  }

  private getInitialPreference(): ThemePreference {
    try {
      const storedPreference = this.document.defaultView?.localStorage.getItem(THEME_STORAGE_KEY);
      return storedPreference === 'light' ||
        storedPreference === 'dark' ||
        storedPreference === 'system'
        ? storedPreference
        : 'system';
    } catch {
      return 'system';
    }
  }

  private persistPreference(preference: ThemePreference): void {
    try {
      this.document.defaultView?.localStorage.setItem(THEME_STORAGE_KEY, preference);
    } catch {
      // The selected theme still applies when storage is unavailable.
    }
  }

  private applyTheme(theme: Theme): void {
    this.document.documentElement.classList.toggle('dark', theme === 'dark');
  }
}

import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme';

describe('ThemeService', () => {
  it('uses a saved explicit theme instead of the system setting', () => {
    const testDocument = createTestDocument('light', true);
    const service = createService(testDocument.document);

    expect(service.preference()).toBe('light');
    expect(service.resolvedTheme()).toBe('light');
    expect(testDocument.root.classList.contains('dark')).toBe(false);
  });

  it('defaults to the system theme when no preference has been saved', () => {
    const testDocument = createTestDocument(null, true);
    const service = createService(testDocument.document);

    expect(service.preference()).toBe('system');
    expect(service.resolvedTheme()).toBe('dark');
    expect(testDocument.root.classList.contains('dark')).toBe(true);
  });

  it('persists an explicit theme selection', () => {
    const testDocument = createTestDocument('system', false);
    const service = createService(testDocument.document);

    service.setTheme('dark');

    expect(service.preference()).toBe('dark');
    expect(service.resolvedTheme()).toBe('dark');
    expect(testDocument.root.classList.contains('dark')).toBe(true);
    expect(testDocument.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('updates with operating-system changes while using the system preference', () => {
    const testDocument = createTestDocument('system', false);
    const service = createService(testDocument.document);

    testDocument.emitSystemTheme(true);

    expect(service.preference()).toBe('system');
    expect(service.resolvedTheme()).toBe('dark');
    expect(testDocument.root.classList.contains('dark')).toBe(true);
  });

  it('ignores operating-system changes when an explicit theme is selected', () => {
    const testDocument = createTestDocument('light', false);
    const service = createService(testDocument.document);

    testDocument.emitSystemTheme(true);

    expect(service.resolvedTheme()).toBe('light');
    expect(testDocument.root.classList.contains('dark')).toBe(false);
  });
});

function createService(document: Document): ThemeService {
  TestBed.configureTestingModule({
    providers: [{ provide: DOCUMENT, useValue: document }],
  });

  return TestBed.inject(ThemeService);
}

function createTestDocument(storedPreference: string | null, systemPrefersDark: boolean) {
  const root = document.createElement('html');
  const setItem = vi.fn();
  let systemThemeListener: ((event: MediaQueryListEvent) => void) | undefined;
  let matches = systemPrefersDark;
  const mediaQuery = {
    get matches() {
      return matches;
    },
    addEventListener: vi.fn((_type: string, listener: (event: MediaQueryListEvent) => void) => {
      systemThemeListener = listener;
    }),
    removeEventListener: vi.fn(),
  };
  const testDocument = {
    documentElement: root,
    defaultView: {
      localStorage: {
        getItem: vi.fn(() => storedPreference),
        setItem,
      },
      matchMedia: vi.fn(() => mediaQuery),
    },
  } as unknown as Document;

  return {
    document: testDocument,
    root,
    setItem,
    emitSystemTheme(isDark: boolean) {
      matches = isDark;
      systemThemeListener?.({ matches: isDark } as MediaQueryListEvent);
    },
  };
}

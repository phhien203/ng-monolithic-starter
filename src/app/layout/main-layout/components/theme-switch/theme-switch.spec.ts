import { TestBed } from '@angular/core/testing';

import { ThemeSwitch } from './theme-switch';

describe('ThemeSwitch', () => {
  beforeEach(async () => {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');

    await TestBed.configureTestingModule({
      imports: [ThemeSwitch],
    }).compileComponents();
  });

  afterEach(() => {
    localStorage.removeItem('theme');
    document.documentElement.classList.remove('dark');
  });

  it('selects and persists a theme from the menu', async () => {
    const fixture = TestBed.createComponent(ThemeSwitch);
    await fixture.whenStable();
    const trigger: HTMLButtonElement = fixture.nativeElement.querySelector(
      'button[aria-label="Select color theme"]',
    );

    trigger.click();
    await fixture.whenStable();
    const darkOption: HTMLButtonElement | null = document.body.querySelector(
      'button[data-theme-option="dark"]',
    );
    expect(darkOption).not.toBeNull();

    darkOption?.click();
    await fixture.whenStable();

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(trigger.title).toBe('Theme: dark');
  });
});

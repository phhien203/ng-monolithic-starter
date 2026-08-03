import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMonitor, lucideMoon, lucideSun } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';

import { ThemePreference, ThemeService } from '@core/theme/theme';

@Component({
  selector: 'app-theme-switch',
  imports: [HlmButtonImports, HlmDropdownMenuImports, NgIcon],
  providers: [provideIcons({ lucideMonitor, lucideMoon, lucideSun })],
  template: `
    <button
      hlmBtn
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Select color theme"
      [title]="'Theme: ' + theme.preference()"
      [hlmDropdownMenuTrigger]="themeMenu"
      align="end"
    >
      @switch (theme.preference()) {
        @case ('light') {
          <ng-icon name="lucideSun" />
        }
        @case ('dark') {
          <ng-icon name="lucideMoon" />
        }
        @default {
          <ng-icon name="lucideMonitor" />
        }
      }
    </button>

    <ng-template #themeMenu>
      <hlm-dropdown-menu class="min-w-36">
        <hlm-dropdown-menu-label>Theme</hlm-dropdown-menu-label>
        @for (option of options; track option.value) {
          <button
            hlmDropdownMenuRadio
            type="button"
            [attr.data-theme-option]="option.value"
            [checked]="theme.preference() === option.value"
            [keepOpen]="false"
            (triggered)="theme.setTheme(option.value)"
          >
            <ng-icon [name]="option.icon" />
            {{ option.label }}
            <hlm-dropdown-menu-radio-indicator />
          </button>
        }
      </hlm-dropdown-menu>
    </ng-template>
  `,
})
export class ThemeSwitch {
  protected readonly theme = inject(ThemeService);
  protected readonly options: readonly {
    value: ThemePreference;
    label: string;
    icon: string;
  }[] = [
    { value: 'light', label: 'Light', icon: 'lucideSun' },
    { value: 'dark', label: 'Dark', icon: 'lucideMoon' },
    { value: 'system', label: 'System', icon: 'lucideMonitor' },
  ];
}

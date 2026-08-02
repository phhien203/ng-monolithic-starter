import { Component, computed, inject, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBadgeCheck,
  lucideBell,
  lucideChevronsUpDown,
  lucideCreditCard,
  lucideLogOut,
  lucideSparkles,
} from '@ng-icons/lucide';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmSidebarImports, HlmSidebarService } from '@spartan-ng/helm/sidebar';

import { SidebarUser } from '@layout/main-layout/models/sidebar-data';

@Component({
  selector: 'app-nav-user',
  imports: [HlmSidebarImports, HlmAvatarImports, HlmDropdownMenuImports, NgIcon],
  providers: [
    provideIcons({
      lucideBadgeCheck,
      lucideBell,
      lucideChevronsUpDown,
      lucideCreditCard,
      lucideLogOut,
      lucideSparkles,
    }),
  ],
  template: `
    @let currentUser = user();
    <ul hlmSidebarMenu>
      <li hlmSidebarMenuItem>
        <button
          hlmSidebarMenuButton
          size="lg"
          type="button"
          [hlmDropdownMenuTrigger]="userMenu"
          [side]="menuSide()"
          align="end"
        >
          <hlm-avatar class="rounded-lg">
            <span hlmAvatarFallback class="rounded-lg">{{ currentUser.initials }}</span>
          </hlm-avatar>
          <span class="grid flex-1 text-left text-sm leading-tight">
            <span class="truncate font-medium">{{ currentUser.name }}</span>
            <span class="truncate text-xs">{{ currentUser.email }}</span>
          </span>
          <ng-icon name="lucideChevronsUpDown" class="ml-auto text-base" />
        </button>
      </li>
    </ul>

    <ng-template #userMenu>
      <hlm-dropdown-menu class="min-w-56 rounded-lg">
        <hlm-dropdown-menu-label>
          <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <hlm-avatar class="rounded-lg">
              <span hlmAvatarFallback class="rounded-lg">{{ currentUser.initials }}</span>
            </hlm-avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{{ currentUser.name }}</span>
              <span class="truncate text-xs">{{ currentUser.email }}</span>
            </div>
          </div>
        </hlm-dropdown-menu-label>
        <hlm-dropdown-menu-separator />
        <button hlmDropdownMenuItem type="button">
          <ng-icon name="lucideSparkles" />
          Upgrade to Pro
        </button>
        <hlm-dropdown-menu-separator />
        <hlm-dropdown-menu-group>
          <button hlmDropdownMenuItem type="button">
            <ng-icon name="lucideBadgeCheck" />
            Account
          </button>
          <button hlmDropdownMenuItem type="button">
            <ng-icon name="lucideCreditCard" />
            Billing
          </button>
          <button hlmDropdownMenuItem type="button">
            <ng-icon name="lucideBell" />
            Notifications
          </button>
        </hlm-dropdown-menu-group>
        <hlm-dropdown-menu-separator />
        <button hlmDropdownMenuItem type="button">
          <ng-icon name="lucideLogOut" />
          Log out
        </button>
      </hlm-dropdown-menu>
    </ng-template>
  `,
})
export class NavUser {
  private readonly sidebarService = inject(HlmSidebarService);

  protected readonly menuSide = computed(() => (this.sidebarService.isMobile() ? 'top' : 'right'));

  readonly user = input.required<SidebarUser>();
}

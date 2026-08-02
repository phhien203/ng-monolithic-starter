import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLifeBuoy, lucideSend } from '@ng-icons/lucide';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

import { SidebarNavigationItem } from '@layout/main-layout/models/sidebar-data';

@Component({
  selector: 'app-nav-secondary',
  imports: [HlmSidebarImports, NgIcon, RouterLink],
  providers: [provideIcons({ lucideLifeBuoy, lucideSend })],
  template: `
    <hlm-sidebar-group>
      <div hlmSidebarGroupContent>
        <ul hlmSidebarMenu>
          @for (item of items(); track item.title) {
            <li hlmSidebarMenuItem>
              <a hlmSidebarMenuButton size="sm" [routerLink]="item.url">
                <ng-icon [name]="item.icon" />
                <span>{{ item.title }}</span>
              </a>
            </li>
          }
        </ul>
      </div>
    </hlm-sidebar-group>
  `,
})
export class NavSecondary {
  readonly items = input.required<SidebarNavigationItem[]>();
}

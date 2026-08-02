import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBookOpen,
  lucideBot,
  lucideChevronRight,
  lucideSettings2,
  lucideSquareTerminal,
} from '@ng-icons/lucide';
import { HlmCollapsibleImports } from '@spartan-ng/helm/collapsible';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

import { SidebarNavigationItem } from '@layout/main-layout/models/sidebar-data';

@Component({
  selector: 'app-nav-main',
  imports: [HlmSidebarImports, HlmCollapsibleImports, NgIcon, RouterLink],
  providers: [
    provideIcons({
      lucideBookOpen,
      lucideBot,
      lucideChevronRight,
      lucideSettings2,
      lucideSquareTerminal,
    }),
  ],
  template: `
    <hlm-sidebar-group>
      <div hlmSidebarGroupLabel>Platform</div>
      <ul hlmSidebarMenu>
        @for (item of items(); track item.title) {
          <hlm-collapsible [expanded]="item.isActive ?? false">
            <li hlmSidebarMenuItem>
              <a hlmSidebarMenuButton [isActive]="item.isActive ?? false" [routerLink]="item.url">
                <ng-icon [name]="item.icon" />
                <span>{{ item.title }}</span>
              </a>
              @if (item.items; as subItems) {
                <button
                  hlmCollapsibleTrigger
                  hlmSidebarMenuAction
                  class="data-[state=open]:rotate-90"
                  type="button"
                >
                  <ng-icon name="lucideChevronRight" />
                  <span class="sr-only">Toggle {{ item.title }} navigation</span>
                </button>
                <hlm-collapsible-content>
                  <ul hlmSidebarMenuSub>
                    @for (subItem of subItems; track subItem.title) {
                      <li hlmSidebarMenuSubItem>
                        <a hlmSidebarMenuSubButton [routerLink]="subItem.url">
                          {{ subItem.title }}
                        </a>
                      </li>
                    }
                  </ul>
                </hlm-collapsible-content>
              }
            </li>
          </hlm-collapsible>
        }
      </ul>
    </hlm-sidebar-group>
  `,
})
export class NavMain {
  readonly items = input.required<SidebarNavigationItem[]>();
}

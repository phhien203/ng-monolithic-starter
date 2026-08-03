import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCommand } from '@ng-icons/lucide';
import { HlmBreadcrumbImports } from '@spartan-ng/helm/breadcrumb';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

import { NavMain } from '@layout/main-layout/components/nav-main';
import { NavProjects } from '@layout/main-layout/components/nav-projects';
import { NavSecondary } from '@layout/main-layout/components/nav-secondary';
import { NavUser } from '@layout/main-layout/components/nav-user';
import { ThemeSwitch } from '@layout/main-layout/components/theme-switch/theme-switch';
import { sidebarData } from '@layout/main-layout/models/sidebar-data';

@Component({
  selector: 'app-main-layout',
  imports: [
    HlmBreadcrumbImports,
    HlmSeparatorImports,
    HlmSidebarImports,
    NavMain,
    NavProjects,
    NavSecondary,
    NavUser,
    ThemeSwitch,
    NgIcon,
    RouterLink,
    RouterOutlet,
  ],
  providers: [provideIcons({ lucideCommand })],
  host: { class: 'block' },
  template: `
    <div hlmSidebarWrapper>
      <hlm-sidebar variant="inset">
        <hlm-sidebar-header>
          <ul hlmSidebarMenu>
            <li hlmSidebarMenuItem>
              <a hlmSidebarMenuButton size="lg" routerLink="/">
                <span
                  class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
                >
                  <ng-icon name="lucideCommand" class="text-base" />
                </span>
                <span class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-medium">HP Showcase LLC</span>
                  <span class="truncate text-xs">Enterprise</span>
                </span>
              </a>
            </li>
          </ul>
        </hlm-sidebar-header>

        <hlm-sidebar-content>
          <app-nav-main [items]="data.navMain" />
          <app-nav-projects [projects]="data.projects" />
          <app-nav-secondary class="mt-auto" [items]="data.navSecondary" />
        </hlm-sidebar-content>

        <hlm-sidebar-footer>
          <app-nav-user [user]="data.user" />
        </hlm-sidebar-footer>
      </hlm-sidebar>

      <main hlmSidebarInset>
        <header class="flex h-16 shrink-0 items-center justify-between gap-2 px-4">
          <div class="flex items-center gap-2">
            <button hlmSidebarTrigger type="button">
              <span class="sr-only">Toggle Sidebar</span>
            </button>
            <hlm-separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
            <nav hlmBreadcrumb aria-label="Breadcrumb">
              <ol hlmBreadcrumbList>
                <li hlmBreadcrumbItem class="hidden sm:block">
                  <a hlmBreadcrumbLink link="/">Application</a>
                </li>
                <li hlmBreadcrumbSeparator class="hidden sm:block"></li>
                <li hlmBreadcrumbItem>
                  <span hlmBreadcrumbPage>Dashboard</span>
                </li>
              </ol>
            </nav>
          </div>
          <app-theme-switch />
        </header>

        <section class="flex flex-1 flex-col p-4" aria-label="Page content">
          <router-outlet />
        </section>
      </main>
    </div>
  `,
})
export class MainLayout {
  protected readonly data = sidebarData;
}

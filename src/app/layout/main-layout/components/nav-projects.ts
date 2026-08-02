import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideChartPie,
  lucideEllipsis,
  lucideFolder,
  lucideFrame,
  lucideMap,
  lucideShare,
  lucideTrash2,
} from '@ng-icons/lucide';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmSidebarImports, HlmSidebarService } from '@spartan-ng/helm/sidebar';

import { SidebarProject } from '@layout/main-layout/models/sidebar-data';

@Component({
  selector: 'app-nav-projects',
  imports: [HlmSidebarImports, HlmDropdownMenuImports, NgIcon, RouterLink],
  providers: [
    provideIcons({
      lucideChartPie,
      lucideEllipsis,
      lucideFolder,
      lucideFrame,
      lucideMap,
      lucideShare,
      lucideTrash2,
    }),
  ],
  template: `
    <hlm-sidebar-group>
      <div hlmSidebarGroupLabel>Projects</div>
      <ul hlmSidebarMenu>
        @for (project of projects(); track project.name) {
          <li hlmSidebarMenuItem>
            <a hlmSidebarMenuButton [routerLink]="project.url">
              <ng-icon [name]="project.icon" />
              <span>{{ project.name }}</span>
            </a>
            <button
              hlmSidebarMenuAction
              showOnHover
              type="button"
              [hlmDropdownMenuTrigger]="projectMenu"
              [hlmDropdownMenuTriggerData]="{ $implicit: project }"
              [side]="menuSide()"
              [align]="menuAlign()"
            >
              <ng-icon name="lucideEllipsis" />
              <span class="sr-only">More actions for {{ project.name }}</span>
            </button>
          </li>
        }
        <li hlmSidebarMenuItem>
          <button hlmSidebarMenuButton type="button">
            <ng-icon name="lucideEllipsis" />
            <span>More</span>
          </button>
        </li>
      </ul>
    </hlm-sidebar-group>

    <ng-template #projectMenu let-project>
      <hlm-dropdown-menu class="w-48">
        <hlm-dropdown-menu-label>{{ project.name }}</hlm-dropdown-menu-label>
        <hlm-dropdown-menu-separator />
        <button hlmDropdownMenuItem type="button">
          <ng-icon name="lucideFolder" />
          View Project
        </button>
        <button hlmDropdownMenuItem type="button">
          <ng-icon name="lucideShare" />
          Share Project
        </button>
        <hlm-dropdown-menu-separator />
        <button hlmDropdownMenuItem type="button">
          <ng-icon name="lucideTrash2" />
          Delete Project
        </button>
      </hlm-dropdown-menu>
    </ng-template>
  `,
})
export class NavProjects {
  private readonly sidebarService = inject(HlmSidebarService);

  protected readonly menuSide = computed(() =>
    this.sidebarService.isMobile() ? 'bottom' : 'right',
  );
  protected readonly menuAlign = computed(() => (this.sidebarService.isMobile() ? 'end' : 'start'));

  readonly projects = input.required<SidebarProject[]>();
}

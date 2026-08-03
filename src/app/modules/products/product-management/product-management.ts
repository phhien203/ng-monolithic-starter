import { Component, computed, input } from '@angular/core';
import { HlmAlertImports } from '@spartan-ng/helm/alert';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmEmptyImports } from '@spartan-ng/helm/empty';
import { HlmSkeletonImports } from '@spartan-ng/helm/skeleton';

import { ProductManagementState } from '@modules/products/models/product';

const initialState: ProductManagementState = { status: 'success', products: [] };

@Component({
  selector: 'app-product-management',
  imports: [HlmAlertImports, HlmBadgeImports, HlmCardImports, HlmEmptyImports, HlmSkeletonImports],
  template: `
    <section class="flex flex-col gap-6" aria-labelledby="product-management-title">
      <header class="flex flex-col gap-1">
        <h1 id="product-management-title" class="text-2xl font-semibold">Product Management</h1>
        <p class="text-muted-foreground text-sm">Review and maintain the product catalog.</p>
      </header>

      @switch (state().status) {
        @case ('loading') {
          <div class="grid gap-4 md:grid-cols-2" aria-busy="true" aria-label="Loading products">
            <span class="sr-only">Loading products</span>
            @for (placeholder of loadingPlaceholders; track placeholder) {
              <div hlmSkeleton class="h-32" aria-hidden="true"></div>
            }
          </div>
        }
        @case ('error') {
          <div hlmAlert variant="destructive" role="alert">
            <h2 hlmAlertTitle>Products could not be loaded</h2>
            <p hlmAlertDescription>{{ errorMessage() }}</p>
          </div>
        }
        @case ('success') {
          @if (products().length === 0) {
            <hlm-empty>
              <div hlmEmptyHeader>
                <h2 hlmEmptyTitle>No products yet</h2>
                <p hlmEmptyDescription>Add the first product when the catalog is ready.</p>
              </div>
            </hlm-empty>
          } @else {
            <ul class="grid gap-4 md:grid-cols-2" aria-label="Product catalog">
              @for (product of products(); track product.id) {
                <li hlmCard>
                  <div hlmCardHeader>
                    <div hlmCardAction>
                      <span
                        hlmBadge
                        [variant]="product.status === 'active' ? 'default' : 'secondary'"
                      >
                        {{ product.status }}
                      </span>
                    </div>
                    <h2 hlmCardTitle>{{ product.name }}</h2>
                    <p hlmCardDescription>{{ product.description }}</p>
                  </div>
                </li>
              }
            </ul>
          }
        }
      }
    </section>
  `,
})
export class ProductManagement {
  public readonly state = input<ProductManagementState, ProductManagementState | undefined>(
    initialState,
    { transform: (state) => state ?? initialState },
  );

  protected readonly loadingPlaceholders = [1, 2] as const;

  protected readonly products = computed(() => {
    const state = this.state();
    return state.status === 'success' ? state.products : [];
  });

  protected readonly errorMessage = computed(() => {
    const state = this.state();
    return state.status === 'error' ? state.message : '';
  });
}

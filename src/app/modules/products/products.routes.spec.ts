import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { ProductManagement } from '@modules/products/product-management/product-management';

describe('product routes', () => {
  it('lazy-loads the product management page', async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(
          [
            {
              path: 'products',
              loadChildren: () => import('@modules/products/products.routes'),
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    });
    const harness = await RouterTestingHarness.create();

    const page = await harness.navigateByUrl('/products', ProductManagement);

    expect(page).toBeInstanceOf(ProductManagement);
    expect(harness.routeNativeElement?.textContent).toContain('Product Management');
  });
});

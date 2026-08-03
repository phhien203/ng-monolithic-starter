import { TestBed } from '@angular/core/testing';

import { ProductManagement } from '@modules/products/product-management/product-management';

describe('ProductManagement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [ProductManagement] });
  });

  it('shows the empty state by default', async () => {
    const fixture = TestBed.createComponent(ProductManagement);

    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('No products yet');
  });

  it('shows an accessible loading state', async () => {
    const fixture = TestBed.createComponent(ProductManagement);

    fixture.componentRef.setInput('state', { status: 'loading' });
    await fixture.whenStable();

    const loadingRegion: HTMLElement | null =
      fixture.nativeElement.querySelector('[aria-busy=true]');
    expect(loadingRegion?.getAttribute('aria-label')).toBe('Loading products');
  });

  it('shows the error state', async () => {
    const fixture = TestBed.createComponent(ProductManagement);

    fixture.componentRef.setInput('state', {
      status: 'error',
      message: 'The catalog service is unavailable.',
    });
    await fixture.whenStable();

    const alert: HTMLElement | null = fixture.nativeElement.querySelector('[role=alert]');
    expect(alert?.textContent).toContain('Products could not be loaded');
    expect(alert?.textContent).toContain('The catalog service is unavailable.');
  });

  it('renders products in the success state', async () => {
    const fixture = TestBed.createComponent(ProductManagement);

    fixture.componentRef.setInput('state', {
      status: 'success',
      products: [
        {
          id: 'product-1',
          name: 'Example product',
          description: 'A reference product for the starter.',
          status: 'active',
        },
      ],
    });
    await fixture.whenStable();

    const catalog: HTMLElement | null = fixture.nativeElement.querySelector(
      '[aria-label="Product catalog"]',
    );
    expect(catalog?.textContent).toContain('Example product');
    expect(catalog?.textContent).toContain('active');
  });
});

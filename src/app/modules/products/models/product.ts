export interface Product {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly status: 'active' | 'draft';
}

export type ProductManagementState =
  | { readonly status: 'loading' }
  | { readonly status: 'error'; readonly message: string }
  | { readonly status: 'success'; readonly products: readonly Product[] };

import { Routes } from '@angular/router';

export default [
  {
    path: '',
    providers: [],
    children: [
      {
        path: '',
        title: 'Product Management',
        loadComponent: () =>
          import('@modules/products/product-management/product-management').then(
            (m) => m.ProductManagement,
          ),
      },
    ],
  },
] satisfies Routes;

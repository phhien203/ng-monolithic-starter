import { Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'settings',
  // },
  {
    path: 'products',
    loadChildren: () => import('@modules/products/products.routes'),
  },
  {
    path: 'settings',
    loadChildren: () => import('@modules/settings/settings.routes'),
  },
];

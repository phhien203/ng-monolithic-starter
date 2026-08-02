import { Routes } from '@angular/router';

export default [
  {
    path: '',
    providers: [],
    children: [
      {
        path: '',
        title: 'General Settings',
        loadComponent: () =>
          import('@modules/settings/general-settings/general-settings').then(
            (m) => m.GeneralSettings,
          ),
      },
    ],
  },
] satisfies Routes;

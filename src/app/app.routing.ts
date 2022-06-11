import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'zone',
    loadChildren: () =>
      import('./views/zone/zone.module').then((m) => m.ZoneModule),
    pathMatch: 'full',
  },
];

import { Routes } from '@angular/router';
import { ZoneComponent } from './zone.component';
import { ZoneGuard } from './zone.guard';

export const routes: Routes = [
  {
    path: '',
    component: ZoneComponent,
    canActivate: [ZoneGuard],
  },
];

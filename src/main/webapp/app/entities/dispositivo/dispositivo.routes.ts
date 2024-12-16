import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import DispositivoResolve from './route/dispositivo-routing-resolve.service';

const dispositivoRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/dispositivo.component').then(m => m.DispositivoComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/dispositivo-detail.component').then(m => m.DispositivoDetailComponent),
    resolve: {
      dispositivo: DispositivoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/dispositivo-update.component').then(m => m.DispositivoUpdateComponent),
    resolve: {
      dispositivo: DispositivoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/dispositivo-update.component').then(m => m.DispositivoUpdateComponent),
    resolve: {
      dispositivo: DispositivoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default dispositivoRoute;

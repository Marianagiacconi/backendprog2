import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import AdicionalResolve from './route/adicional-routing-resolve.service';

const adicionalRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/adicional.component').then(m => m.AdicionalComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/adicional-detail.component').then(m => m.AdicionalDetailComponent),
    resolve: {
      adicional: AdicionalResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/adicional-update.component').then(m => m.AdicionalUpdateComponent),
    resolve: {
      adicional: AdicionalResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/adicional-update.component').then(m => m.AdicionalUpdateComponent),
    resolve: {
      adicional: AdicionalResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default adicionalRoute;

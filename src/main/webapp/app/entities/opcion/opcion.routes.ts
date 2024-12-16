import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import OpcionResolve from './route/opcion-routing-resolve.service';

const opcionRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/opcion.component').then(m => m.OpcionComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/opcion-detail.component').then(m => m.OpcionDetailComponent),
    resolve: {
      opcion: OpcionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/opcion-update.component').then(m => m.OpcionUpdateComponent),
    resolve: {
      opcion: OpcionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/opcion-update.component').then(m => m.OpcionUpdateComponent),
    resolve: {
      opcion: OpcionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default opcionRoute;

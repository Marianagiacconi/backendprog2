import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import CaracteristicaResolve from './route/caracteristica-routing-resolve.service';

const caracteristicaRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/caracteristica.component').then(m => m.CaracteristicaComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/caracteristica-detail.component').then(m => m.CaracteristicaDetailComponent),
    resolve: {
      caracteristica: CaracteristicaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/caracteristica-update.component').then(m => m.CaracteristicaUpdateComponent),
    resolve: {
      caracteristica: CaracteristicaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/caracteristica-update.component').then(m => m.CaracteristicaUpdateComponent),
    resolve: {
      caracteristica: CaracteristicaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default caracteristicaRoute;

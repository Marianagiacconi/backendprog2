import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import VentaResolve from './route/venta-routing-resolve.service';

const ventaRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/venta.component').then(m => m.VentaComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/venta-detail.component').then(m => m.VentaDetailComponent),
    resolve: {
      venta: VentaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/venta-update.component').then(m => m.VentaUpdateComponent),
    resolve: {
      venta: VentaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/venta-update.component').then(m => m.VentaUpdateComponent),
    resolve: {
      venta: VentaResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default ventaRoute;

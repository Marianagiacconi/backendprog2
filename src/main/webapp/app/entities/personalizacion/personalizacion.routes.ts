import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import PersonalizacionResolve from './route/personalizacion-routing-resolve.service';

const personalizacionRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/personalizacion.component').then(m => m.PersonalizacionComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/personalizacion-detail.component').then(m => m.PersonalizacionDetailComponent),
    resolve: {
      personalizacion: PersonalizacionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/personalizacion-update.component').then(m => m.PersonalizacionUpdateComponent),
    resolve: {
      personalizacion: PersonalizacionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/personalizacion-update.component').then(m => m.PersonalizacionUpdateComponent),
    resolve: {
      personalizacion: PersonalizacionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default personalizacionRoute;

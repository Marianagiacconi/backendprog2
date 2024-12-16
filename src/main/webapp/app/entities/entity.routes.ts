import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'techmarketApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'adicional',
    data: { pageTitle: 'techmarketApp.adicional.home.title' },
    loadChildren: () => import('./adicional/adicional.routes'),
  },
  {
    path: 'caracteristica',
    data: { pageTitle: 'techmarketApp.caracteristica.home.title' },
    loadChildren: () => import('./caracteristica/caracteristica.routes'),
  },
  {
    path: 'dispositivo',
    data: { pageTitle: 'techmarketApp.dispositivo.home.title' },
    loadChildren: () => import('./dispositivo/dispositivo.routes'),
  },
  {
    path: 'opcion',
    data: { pageTitle: 'techmarketApp.opcion.home.title' },
    loadChildren: () => import('./opcion/opcion.routes'),
  },
  {
    path: 'personalizacion',
    data: { pageTitle: 'techmarketApp.personalizacion.home.title' },
    loadChildren: () => import('./personalizacion/personalizacion.routes'),
  },
  {
    path: 'venta',
    data: { pageTitle: 'techmarketApp.venta.home.title' },
    loadChildren: () => import('./venta/venta.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;

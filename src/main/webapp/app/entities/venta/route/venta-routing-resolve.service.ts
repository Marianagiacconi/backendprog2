import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IVenta } from '../venta.model';
import { VentaService } from '../service/venta.service';

const ventaResolve = (route: ActivatedRouteSnapshot): Observable<null | IVenta> => {
  const id = route.params.id;
  if (id) {
    return inject(VentaService)
      .find(id)
      .pipe(
        mergeMap((venta: HttpResponse<IVenta>) => {
          if (venta.body) {
            return of(venta.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default ventaResolve;

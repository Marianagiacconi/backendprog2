import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IOpcion } from '../opcion.model';
import { OpcionService } from '../service/opcion.service';

const opcionResolve = (route: ActivatedRouteSnapshot): Observable<null | IOpcion> => {
  const id = route.params.id;
  if (id) {
    return inject(OpcionService)
      .find(id)
      .pipe(
        mergeMap((opcion: HttpResponse<IOpcion>) => {
          if (opcion.body) {
            return of(opcion.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default opcionResolve;

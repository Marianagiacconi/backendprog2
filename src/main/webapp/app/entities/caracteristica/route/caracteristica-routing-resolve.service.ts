import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICaracteristica } from '../caracteristica.model';
import { CaracteristicaService } from '../service/caracteristica.service';

const caracteristicaResolve = (route: ActivatedRouteSnapshot): Observable<null | ICaracteristica> => {
  const id = route.params.id;
  if (id) {
    return inject(CaracteristicaService)
      .find(id)
      .pipe(
        mergeMap((caracteristica: HttpResponse<ICaracteristica>) => {
          if (caracteristica.body) {
            return of(caracteristica.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default caracteristicaResolve;

import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDispositivo } from '../dispositivo.model';
import { DispositivoService } from '../service/dispositivo.service';

const dispositivoResolve = (route: ActivatedRouteSnapshot): Observable<null | IDispositivo> => {
  const id = route.params.id;
  if (id) {
    return inject(DispositivoService)
      .find(id)
      .pipe(
        mergeMap((dispositivo: HttpResponse<IDispositivo>) => {
          if (dispositivo.body) {
            return of(dispositivo.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default dispositivoResolve;

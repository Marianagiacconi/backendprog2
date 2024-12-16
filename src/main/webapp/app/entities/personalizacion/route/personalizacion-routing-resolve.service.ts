import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPersonalizacion } from '../personalizacion.model';
import { PersonalizacionService } from '../service/personalizacion.service';

const personalizacionResolve = (route: ActivatedRouteSnapshot): Observable<null | IPersonalizacion> => {
  const id = route.params.id;
  if (id) {
    return inject(PersonalizacionService)
      .find(id)
      .pipe(
        mergeMap((personalizacion: HttpResponse<IPersonalizacion>) => {
          if (personalizacion.body) {
            return of(personalizacion.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default personalizacionResolve;

import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAdicional } from '../adicional.model';
import { AdicionalService } from '../service/adicional.service';

const adicionalResolve = (route: ActivatedRouteSnapshot): Observable<null | IAdicional> => {
  const id = route.params.id;
  if (id) {
    return inject(AdicionalService)
      .find(id)
      .pipe(
        mergeMap((adicional: HttpResponse<IAdicional>) => {
          if (adicional.body) {
            return of(adicional.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default adicionalResolve;

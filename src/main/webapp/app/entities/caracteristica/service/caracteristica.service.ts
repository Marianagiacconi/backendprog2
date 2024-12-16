import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICaracteristica, NewCaracteristica } from '../caracteristica.model';

export type PartialUpdateCaracteristica = Partial<ICaracteristica> & Pick<ICaracteristica, 'id'>;

export type EntityResponseType = HttpResponse<ICaracteristica>;
export type EntityArrayResponseType = HttpResponse<ICaracteristica[]>;

@Injectable({ providedIn: 'root' })
export class CaracteristicaService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/caracteristicas');

  create(caracteristica: NewCaracteristica): Observable<EntityResponseType> {
    return this.http.post<ICaracteristica>(this.resourceUrl, caracteristica, { observe: 'response' });
  }

  update(caracteristica: ICaracteristica): Observable<EntityResponseType> {
    return this.http.put<ICaracteristica>(`${this.resourceUrl}/${this.getCaracteristicaIdentifier(caracteristica)}`, caracteristica, {
      observe: 'response',
    });
  }

  partialUpdate(caracteristica: PartialUpdateCaracteristica): Observable<EntityResponseType> {
    return this.http.patch<ICaracteristica>(`${this.resourceUrl}/${this.getCaracteristicaIdentifier(caracteristica)}`, caracteristica, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICaracteristica>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICaracteristica[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCaracteristicaIdentifier(caracteristica: Pick<ICaracteristica, 'id'>): number {
    return caracteristica.id;
  }

  compareCaracteristica(o1: Pick<ICaracteristica, 'id'> | null, o2: Pick<ICaracteristica, 'id'> | null): boolean {
    return o1 && o2 ? this.getCaracteristicaIdentifier(o1) === this.getCaracteristicaIdentifier(o2) : o1 === o2;
  }

  addCaracteristicaToCollectionIfMissing<Type extends Pick<ICaracteristica, 'id'>>(
    caracteristicaCollection: Type[],
    ...caracteristicasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const caracteristicas: Type[] = caracteristicasToCheck.filter(isPresent);
    if (caracteristicas.length > 0) {
      const caracteristicaCollectionIdentifiers = caracteristicaCollection.map(caracteristicaItem =>
        this.getCaracteristicaIdentifier(caracteristicaItem),
      );
      const caracteristicasToAdd = caracteristicas.filter(caracteristicaItem => {
        const caracteristicaIdentifier = this.getCaracteristicaIdentifier(caracteristicaItem);
        if (caracteristicaCollectionIdentifiers.includes(caracteristicaIdentifier)) {
          return false;
        }
        caracteristicaCollectionIdentifiers.push(caracteristicaIdentifier);
        return true;
      });
      return [...caracteristicasToAdd, ...caracteristicaCollection];
    }
    return caracteristicaCollection;
  }
}

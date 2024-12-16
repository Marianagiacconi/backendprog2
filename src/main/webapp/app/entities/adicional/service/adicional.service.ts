import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAdicional, NewAdicional } from '../adicional.model';

export type PartialUpdateAdicional = Partial<IAdicional> & Pick<IAdicional, 'id'>;

export type EntityResponseType = HttpResponse<IAdicional>;
export type EntityArrayResponseType = HttpResponse<IAdicional[]>;

@Injectable({ providedIn: 'root' })
export class AdicionalService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/adicionals');

  create(adicional: NewAdicional): Observable<EntityResponseType> {
    return this.http.post<IAdicional>(this.resourceUrl, adicional, { observe: 'response' });
  }

  update(adicional: IAdicional): Observable<EntityResponseType> {
    return this.http.put<IAdicional>(`${this.resourceUrl}/${this.getAdicionalIdentifier(adicional)}`, adicional, { observe: 'response' });
  }

  partialUpdate(adicional: PartialUpdateAdicional): Observable<EntityResponseType> {
    return this.http.patch<IAdicional>(`${this.resourceUrl}/${this.getAdicionalIdentifier(adicional)}`, adicional, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAdicional>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAdicional[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAdicionalIdentifier(adicional: Pick<IAdicional, 'id'>): number {
    return adicional.id;
  }

  compareAdicional(o1: Pick<IAdicional, 'id'> | null, o2: Pick<IAdicional, 'id'> | null): boolean {
    return o1 && o2 ? this.getAdicionalIdentifier(o1) === this.getAdicionalIdentifier(o2) : o1 === o2;
  }

  addAdicionalToCollectionIfMissing<Type extends Pick<IAdicional, 'id'>>(
    adicionalCollection: Type[],
    ...adicionalsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const adicionals: Type[] = adicionalsToCheck.filter(isPresent);
    if (adicionals.length > 0) {
      const adicionalCollectionIdentifiers = adicionalCollection.map(adicionalItem => this.getAdicionalIdentifier(adicionalItem));
      const adicionalsToAdd = adicionals.filter(adicionalItem => {
        const adicionalIdentifier = this.getAdicionalIdentifier(adicionalItem);
        if (adicionalCollectionIdentifiers.includes(adicionalIdentifier)) {
          return false;
        }
        adicionalCollectionIdentifiers.push(adicionalIdentifier);
        return true;
      });
      return [...adicionalsToAdd, ...adicionalCollection];
    }
    return adicionalCollection;
  }
}

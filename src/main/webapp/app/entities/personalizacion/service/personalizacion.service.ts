import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPersonalizacion, NewPersonalizacion } from '../personalizacion.model';

export type PartialUpdatePersonalizacion = Partial<IPersonalizacion> & Pick<IPersonalizacion, 'id'>;

export type EntityResponseType = HttpResponse<IPersonalizacion>;
export type EntityArrayResponseType = HttpResponse<IPersonalizacion[]>;

@Injectable({ providedIn: 'root' })
export class PersonalizacionService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/personalizacions');

  create(personalizacion: NewPersonalizacion): Observable<EntityResponseType> {
    return this.http.post<IPersonalizacion>(this.resourceUrl, personalizacion, { observe: 'response' });
  }

  update(personalizacion: IPersonalizacion): Observable<EntityResponseType> {
    return this.http.put<IPersonalizacion>(`${this.resourceUrl}/${this.getPersonalizacionIdentifier(personalizacion)}`, personalizacion, {
      observe: 'response',
    });
  }

  partialUpdate(personalizacion: PartialUpdatePersonalizacion): Observable<EntityResponseType> {
    return this.http.patch<IPersonalizacion>(`${this.resourceUrl}/${this.getPersonalizacionIdentifier(personalizacion)}`, personalizacion, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPersonalizacion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPersonalizacion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPersonalizacionIdentifier(personalizacion: Pick<IPersonalizacion, 'id'>): number {
    return personalizacion.id;
  }

  comparePersonalizacion(o1: Pick<IPersonalizacion, 'id'> | null, o2: Pick<IPersonalizacion, 'id'> | null): boolean {
    return o1 && o2 ? this.getPersonalizacionIdentifier(o1) === this.getPersonalizacionIdentifier(o2) : o1 === o2;
  }

  addPersonalizacionToCollectionIfMissing<Type extends Pick<IPersonalizacion, 'id'>>(
    personalizacionCollection: Type[],
    ...personalizacionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const personalizacions: Type[] = personalizacionsToCheck.filter(isPresent);
    if (personalizacions.length > 0) {
      const personalizacionCollectionIdentifiers = personalizacionCollection.map(personalizacionItem =>
        this.getPersonalizacionIdentifier(personalizacionItem),
      );
      const personalizacionsToAdd = personalizacions.filter(personalizacionItem => {
        const personalizacionIdentifier = this.getPersonalizacionIdentifier(personalizacionItem);
        if (personalizacionCollectionIdentifiers.includes(personalizacionIdentifier)) {
          return false;
        }
        personalizacionCollectionIdentifiers.push(personalizacionIdentifier);
        return true;
      });
      return [...personalizacionsToAdd, ...personalizacionCollection];
    }
    return personalizacionCollection;
  }
}

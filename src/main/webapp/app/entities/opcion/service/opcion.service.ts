import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IOpcion, NewOpcion } from '../opcion.model';

export type PartialUpdateOpcion = Partial<IOpcion> & Pick<IOpcion, 'id'>;

export type EntityResponseType = HttpResponse<IOpcion>;
export type EntityArrayResponseType = HttpResponse<IOpcion[]>;

@Injectable({ providedIn: 'root' })
export class OpcionService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/opcions');

  create(opcion: NewOpcion): Observable<EntityResponseType> {
    return this.http.post<IOpcion>(this.resourceUrl, opcion, { observe: 'response' });
  }

  update(opcion: IOpcion): Observable<EntityResponseType> {
    return this.http.put<IOpcion>(`${this.resourceUrl}/${this.getOpcionIdentifier(opcion)}`, opcion, { observe: 'response' });
  }

  partialUpdate(opcion: PartialUpdateOpcion): Observable<EntityResponseType> {
    return this.http.patch<IOpcion>(`${this.resourceUrl}/${this.getOpcionIdentifier(opcion)}`, opcion, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOpcion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOpcion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getOpcionIdentifier(opcion: Pick<IOpcion, 'id'>): number {
    return opcion.id;
  }

  compareOpcion(o1: Pick<IOpcion, 'id'> | null, o2: Pick<IOpcion, 'id'> | null): boolean {
    return o1 && o2 ? this.getOpcionIdentifier(o1) === this.getOpcionIdentifier(o2) : o1 === o2;
  }

  addOpcionToCollectionIfMissing<Type extends Pick<IOpcion, 'id'>>(
    opcionCollection: Type[],
    ...opcionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const opcions: Type[] = opcionsToCheck.filter(isPresent);
    if (opcions.length > 0) {
      const opcionCollectionIdentifiers = opcionCollection.map(opcionItem => this.getOpcionIdentifier(opcionItem));
      const opcionsToAdd = opcions.filter(opcionItem => {
        const opcionIdentifier = this.getOpcionIdentifier(opcionItem);
        if (opcionCollectionIdentifiers.includes(opcionIdentifier)) {
          return false;
        }
        opcionCollectionIdentifiers.push(opcionIdentifier);
        return true;
      });
      return [...opcionsToAdd, ...opcionCollection];
    }
    return opcionCollection;
  }
}

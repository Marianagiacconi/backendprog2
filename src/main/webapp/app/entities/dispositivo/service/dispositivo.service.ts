import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDispositivo, NewDispositivo } from '../dispositivo.model';

export type PartialUpdateDispositivo = Partial<IDispositivo> & Pick<IDispositivo, 'id'>;

export type EntityResponseType = HttpResponse<IDispositivo>;
export type EntityArrayResponseType = HttpResponse<IDispositivo[]>;

@Injectable({ providedIn: 'root' })
export class DispositivoService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/dispositivos');

  create(dispositivo: NewDispositivo): Observable<EntityResponseType> {
    return this.http.post<IDispositivo>(this.resourceUrl, dispositivo, { observe: 'response' });
  }

  update(dispositivo: IDispositivo): Observable<EntityResponseType> {
    return this.http.put<IDispositivo>(`${this.resourceUrl}/${this.getDispositivoIdentifier(dispositivo)}`, dispositivo, {
      observe: 'response',
    });
  }

  partialUpdate(dispositivo: PartialUpdateDispositivo): Observable<EntityResponseType> {
    return this.http.patch<IDispositivo>(`${this.resourceUrl}/${this.getDispositivoIdentifier(dispositivo)}`, dispositivo, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDispositivo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDispositivo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDispositivoIdentifier(dispositivo: Pick<IDispositivo, 'id'>): number {
    return dispositivo.id;
  }

  compareDispositivo(o1: Pick<IDispositivo, 'id'> | null, o2: Pick<IDispositivo, 'id'> | null): boolean {
    return o1 && o2 ? this.getDispositivoIdentifier(o1) === this.getDispositivoIdentifier(o2) : o1 === o2;
  }

  addDispositivoToCollectionIfMissing<Type extends Pick<IDispositivo, 'id'>>(
    dispositivoCollection: Type[],
    ...dispositivosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const dispositivos: Type[] = dispositivosToCheck.filter(isPresent);
    if (dispositivos.length > 0) {
      const dispositivoCollectionIdentifiers = dispositivoCollection.map(dispositivoItem => this.getDispositivoIdentifier(dispositivoItem));
      const dispositivosToAdd = dispositivos.filter(dispositivoItem => {
        const dispositivoIdentifier = this.getDispositivoIdentifier(dispositivoItem);
        if (dispositivoCollectionIdentifiers.includes(dispositivoIdentifier)) {
          return false;
        }
        dispositivoCollectionIdentifiers.push(dispositivoIdentifier);
        return true;
      });
      return [...dispositivosToAdd, ...dispositivoCollection];
    }
    return dispositivoCollection;
  }
}

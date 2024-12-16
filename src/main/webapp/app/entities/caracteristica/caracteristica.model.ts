import { IDispositivo } from 'app/entities/dispositivo/dispositivo.model';

export interface ICaracteristica {
  id: number;
  nombre?: string | null;
  descripcion?: string | null;
  dispositivo?: Pick<IDispositivo, 'id'> | null;
}

export type NewCaracteristica = Omit<ICaracteristica, 'id'> & { id: null };

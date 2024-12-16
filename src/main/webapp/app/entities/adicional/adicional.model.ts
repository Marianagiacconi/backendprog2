import { IDispositivo } from 'app/entities/dispositivo/dispositivo.model';

export interface IAdicional {
  id: number;
  nombre?: string | null;
  descripcion?: string | null;
  precio?: number | null;
  precioGratis?: number | null;
  dispositivos?: Pick<IDispositivo, 'id'>[] | null;
}

export type NewAdicional = Omit<IAdicional, 'id'> & { id: null };

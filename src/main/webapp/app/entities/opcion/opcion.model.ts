import { IPersonalizacion } from 'app/entities/personalizacion/personalizacion.model';

export interface IOpcion {
  id: number;
  codigo?: string | null;
  nombre?: string | null;
  descripcion?: string | null;
  precioAdicional?: number | null;
  personalizacion?: Pick<IPersonalizacion, 'id'> | null;
}

export type NewOpcion = Omit<IOpcion, 'id'> & { id: null };

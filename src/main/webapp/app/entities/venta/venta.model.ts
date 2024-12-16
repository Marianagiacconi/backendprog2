import dayjs from 'dayjs/esm';
import { IUser } from 'app/entities/user/user.model';

export interface IVenta {
  id: number;
  fechaVenta?: dayjs.Dayjs | null;
  precioFinal?: number | null;
  user?: Pick<IUser, 'id'> | null;
}

export type NewVenta = Omit<IVenta, 'id'> & { id: null };

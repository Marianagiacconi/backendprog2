import dayjs from 'dayjs/esm';

import { IVenta, NewVenta } from './venta.model';

export const sampleWithRequiredData: IVenta = {
  id: 28402,
  fechaVenta: dayjs('2024-10-04T02:07'),
};

export const sampleWithPartialData: IVenta = {
  id: 10975,
  fechaVenta: dayjs('2024-10-03T20:50'),
  precioFinal: 12293.85,
};

export const sampleWithFullData: IVenta = {
  id: 17786,
  fechaVenta: dayjs('2024-10-03T22:52'),
  precioFinal: 23650.06,
};

export const sampleWithNewData: NewVenta = {
  fechaVenta: dayjs('2024-10-04T10:04'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

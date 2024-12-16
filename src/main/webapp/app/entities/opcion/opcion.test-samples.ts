import { IOpcion, NewOpcion } from './opcion.model';

export const sampleWithRequiredData: IOpcion = {
  id: 21078,
  codigo: 'how',
  nombre: 'greedily lieu narrowcast',
  descripcion: 'compete',
  precioAdicional: 9242.38,
};

export const sampleWithPartialData: IOpcion = {
  id: 20095,
  codigo: 'chairperson',
  nombre: 'off amidst',
  descripcion: 'meh',
  precioAdicional: 30458.76,
};

export const sampleWithFullData: IOpcion = {
  id: 24829,
  codigo: 'and boo',
  nombre: 'afterwards',
  descripcion: 'bleak',
  precioAdicional: 17281.04,
};

export const sampleWithNewData: NewOpcion = {
  codigo: 'cosset',
  nombre: 'about overreact provided',
  descripcion: 'although next',
  precioAdicional: 17203.26,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

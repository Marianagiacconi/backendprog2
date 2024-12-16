import { IPersonalizacion, NewPersonalizacion } from './personalizacion.model';

export const sampleWithRequiredData: IPersonalizacion = {
  id: 19312,
  nombre: 'stylish',
  descripcion: 'behind unhealthy embarrassment',
};

export const sampleWithPartialData: IPersonalizacion = {
  id: 25446,
  nombre: 'of the',
  descripcion: 'gah',
};

export const sampleWithFullData: IPersonalizacion = {
  id: 19588,
  nombre: 'rationale',
  descripcion: 'flawed',
};

export const sampleWithNewData: NewPersonalizacion = {
  nombre: 'recount',
  descripcion: 'insignificant oh',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

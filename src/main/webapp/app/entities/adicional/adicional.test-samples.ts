import { IAdicional, NewAdicional } from './adicional.model';

export const sampleWithRequiredData: IAdicional = {
  id: 22508,
  nombre: 'trolley',
  descripcion: 'promptly bleak',
  precio: 30189.7,
};

export const sampleWithPartialData: IAdicional = {
  id: 3887,
  nombre: 'formamide',
  descripcion: 'tragic ouch pfft',
  precio: 1374.38,
  precioGratis: 23062.59,
};

export const sampleWithFullData: IAdicional = {
  id: 2156,
  nombre: 'disappointment repurpose',
  descripcion: 'finger underneath',
  precio: 6211.28,
  precioGratis: 9356.03,
};

export const sampleWithNewData: NewAdicional = {
  nombre: 'gah vicinity sometimes',
  descripcion: 'viciously',
  precio: 7450.71,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

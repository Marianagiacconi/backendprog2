import { ICaracteristica, NewCaracteristica } from './caracteristica.model';

export const sampleWithRequiredData: ICaracteristica = {
  id: 32445,
  nombre: 'next bah dishearten',
  descripcion: 'whoever alienated utter',
};

export const sampleWithPartialData: ICaracteristica = {
  id: 29712,
  nombre: 'than informal scruple',
  descripcion: 'lest',
};

export const sampleWithFullData: ICaracteristica = {
  id: 25199,
  nombre: 'row',
  descripcion: 'mindless including',
};

export const sampleWithNewData: NewCaracteristica = {
  nombre: 'shout',
  descripcion: 'commercial magnificent weary',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

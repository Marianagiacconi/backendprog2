import { IDispositivo, NewDispositivo } from './dispositivo.model';

export const sampleWithRequiredData: IDispositivo = {
  id: 17718,
  codigo: 'yippee chairperson',
  nombre: 'where',
  descripcion: '../fake-data/blob/hipster.txt',
  precioBase: 5350.16,
  moneda: 'fair over',
};

export const sampleWithPartialData: IDispositivo = {
  id: 10725,
  codigo: 'hope possession formation',
  nombre: 'amendment finally',
  descripcion: '../fake-data/blob/hipster.txt',
  precioBase: 29709.34,
  moneda: 'sediment lazily',
};

export const sampleWithFullData: IDispositivo = {
  id: 30074,
  codigo: 'punctual',
  nombre: 'signature',
  descripcion: '../fake-data/blob/hipster.txt',
  precioBase: 550.02,
  moneda: 'spirit apropos relieve',
};

export const sampleWithNewData: NewDispositivo = {
  codigo: 'fund unless',
  nombre: 'obediently although tail',
  descripcion: '../fake-data/blob/hipster.txt',
  precioBase: 31840.87,
  moneda: 'than athwart',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

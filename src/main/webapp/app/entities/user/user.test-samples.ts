import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 30312,
  login: 'ppi4',
};

export const sampleWithPartialData: IUser = {
  id: 17842,
  login: 'ZKB',
};

export const sampleWithFullData: IUser = {
  id: 25457,
  login: 'pB',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

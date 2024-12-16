import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: '35ae6a1f-576d-4535-beb0-13b4d3a58994',
};

export const sampleWithPartialData: IAuthority = {
  name: 'b5914c34-7ebe-4ce2-9e39-897a76da642d',
};

export const sampleWithFullData: IAuthority = {
  name: '4b6bcdb7-321f-4d55-93a6-6afdc03b5e45',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

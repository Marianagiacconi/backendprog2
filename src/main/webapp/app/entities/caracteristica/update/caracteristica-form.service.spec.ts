import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../caracteristica.test-samples';

import { CaracteristicaFormService } from './caracteristica-form.service';

describe('Caracteristica Form Service', () => {
  let service: CaracteristicaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaracteristicaFormService);
  });

  describe('Service methods', () => {
    describe('createCaracteristicaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCaracteristicaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
            descripcion: expect.any(Object),
            dispositivo: expect.any(Object),
          }),
        );
      });

      it('passing ICaracteristica should create a new form with FormGroup', () => {
        const formGroup = service.createCaracteristicaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
            descripcion: expect.any(Object),
            dispositivo: expect.any(Object),
          }),
        );
      });
    });

    describe('getCaracteristica', () => {
      it('should return NewCaracteristica for default Caracteristica initial value', () => {
        const formGroup = service.createCaracteristicaFormGroup(sampleWithNewData);

        const caracteristica = service.getCaracteristica(formGroup) as any;

        expect(caracteristica).toMatchObject(sampleWithNewData);
      });

      it('should return NewCaracteristica for empty Caracteristica initial value', () => {
        const formGroup = service.createCaracteristicaFormGroup();

        const caracteristica = service.getCaracteristica(formGroup) as any;

        expect(caracteristica).toMatchObject({});
      });

      it('should return ICaracteristica', () => {
        const formGroup = service.createCaracteristicaFormGroup(sampleWithRequiredData);

        const caracteristica = service.getCaracteristica(formGroup) as any;

        expect(caracteristica).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICaracteristica should not enable id FormControl', () => {
        const formGroup = service.createCaracteristicaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCaracteristica should disable id FormControl', () => {
        const formGroup = service.createCaracteristicaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

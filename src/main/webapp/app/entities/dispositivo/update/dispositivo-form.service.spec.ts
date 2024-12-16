import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../dispositivo.test-samples';

import { DispositivoFormService } from './dispositivo-form.service';

describe('Dispositivo Form Service', () => {
  let service: DispositivoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DispositivoFormService);
  });

  describe('Service methods', () => {
    describe('createDispositivoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDispositivoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            descripcion: expect.any(Object),
            precioBase: expect.any(Object),
            moneda: expect.any(Object),
            adicionales: expect.any(Object),
          }),
        );
      });

      it('passing IDispositivo should create a new form with FormGroup', () => {
        const formGroup = service.createDispositivoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            descripcion: expect.any(Object),
            precioBase: expect.any(Object),
            moneda: expect.any(Object),
            adicionales: expect.any(Object),
          }),
        );
      });
    });

    describe('getDispositivo', () => {
      it('should return NewDispositivo for default Dispositivo initial value', () => {
        const formGroup = service.createDispositivoFormGroup(sampleWithNewData);

        const dispositivo = service.getDispositivo(formGroup) as any;

        expect(dispositivo).toMatchObject(sampleWithNewData);
      });

      it('should return NewDispositivo for empty Dispositivo initial value', () => {
        const formGroup = service.createDispositivoFormGroup();

        const dispositivo = service.getDispositivo(formGroup) as any;

        expect(dispositivo).toMatchObject({});
      });

      it('should return IDispositivo', () => {
        const formGroup = service.createDispositivoFormGroup(sampleWithRequiredData);

        const dispositivo = service.getDispositivo(formGroup) as any;

        expect(dispositivo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDispositivo should not enable id FormControl', () => {
        const formGroup = service.createDispositivoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDispositivo should disable id FormControl', () => {
        const formGroup = service.createDispositivoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

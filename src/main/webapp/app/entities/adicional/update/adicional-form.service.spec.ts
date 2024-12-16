import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../adicional.test-samples';

import { AdicionalFormService } from './adicional-form.service';

describe('Adicional Form Service', () => {
  let service: AdicionalFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdicionalFormService);
  });

  describe('Service methods', () => {
    describe('createAdicionalFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAdicionalFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
            descripcion: expect.any(Object),
            precio: expect.any(Object),
            precioGratis: expect.any(Object),
            dispositivos: expect.any(Object),
          }),
        );
      });

      it('passing IAdicional should create a new form with FormGroup', () => {
        const formGroup = service.createAdicionalFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
            descripcion: expect.any(Object),
            precio: expect.any(Object),
            precioGratis: expect.any(Object),
            dispositivos: expect.any(Object),
          }),
        );
      });
    });

    describe('getAdicional', () => {
      it('should return NewAdicional for default Adicional initial value', () => {
        const formGroup = service.createAdicionalFormGroup(sampleWithNewData);

        const adicional = service.getAdicional(formGroup) as any;

        expect(adicional).toMatchObject(sampleWithNewData);
      });

      it('should return NewAdicional for empty Adicional initial value', () => {
        const formGroup = service.createAdicionalFormGroup();

        const adicional = service.getAdicional(formGroup) as any;

        expect(adicional).toMatchObject({});
      });

      it('should return IAdicional', () => {
        const formGroup = service.createAdicionalFormGroup(sampleWithRequiredData);

        const adicional = service.getAdicional(formGroup) as any;

        expect(adicional).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAdicional should not enable id FormControl', () => {
        const formGroup = service.createAdicionalFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAdicional should disable id FormControl', () => {
        const formGroup = service.createAdicionalFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

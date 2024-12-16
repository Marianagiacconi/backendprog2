import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../opcion.test-samples';

import { OpcionFormService } from './opcion-form.service';

describe('Opcion Form Service', () => {
  let service: OpcionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpcionFormService);
  });

  describe('Service methods', () => {
    describe('createOpcionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createOpcionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            descripcion: expect.any(Object),
            precioAdicional: expect.any(Object),
            personalizacion: expect.any(Object),
          }),
        );
      });

      it('passing IOpcion should create a new form with FormGroup', () => {
        const formGroup = service.createOpcionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            nombre: expect.any(Object),
            descripcion: expect.any(Object),
            precioAdicional: expect.any(Object),
            personalizacion: expect.any(Object),
          }),
        );
      });
    });

    describe('getOpcion', () => {
      it('should return NewOpcion for default Opcion initial value', () => {
        const formGroup = service.createOpcionFormGroup(sampleWithNewData);

        const opcion = service.getOpcion(formGroup) as any;

        expect(opcion).toMatchObject(sampleWithNewData);
      });

      it('should return NewOpcion for empty Opcion initial value', () => {
        const formGroup = service.createOpcionFormGroup();

        const opcion = service.getOpcion(formGroup) as any;

        expect(opcion).toMatchObject({});
      });

      it('should return IOpcion', () => {
        const formGroup = service.createOpcionFormGroup(sampleWithRequiredData);

        const opcion = service.getOpcion(formGroup) as any;

        expect(opcion).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IOpcion should not enable id FormControl', () => {
        const formGroup = service.createOpcionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewOpcion should disable id FormControl', () => {
        const formGroup = service.createOpcionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../personalizacion.test-samples';

import { PersonalizacionFormService } from './personalizacion-form.service';

describe('Personalizacion Form Service', () => {
  let service: PersonalizacionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalizacionFormService);
  });

  describe('Service methods', () => {
    describe('createPersonalizacionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPersonalizacionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
            descripcion: expect.any(Object),
            dispositivo: expect.any(Object),
          }),
        );
      });

      it('passing IPersonalizacion should create a new form with FormGroup', () => {
        const formGroup = service.createPersonalizacionFormGroup(sampleWithRequiredData);

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

    describe('getPersonalizacion', () => {
      it('should return NewPersonalizacion for default Personalizacion initial value', () => {
        const formGroup = service.createPersonalizacionFormGroup(sampleWithNewData);

        const personalizacion = service.getPersonalizacion(formGroup) as any;

        expect(personalizacion).toMatchObject(sampleWithNewData);
      });

      it('should return NewPersonalizacion for empty Personalizacion initial value', () => {
        const formGroup = service.createPersonalizacionFormGroup();

        const personalizacion = service.getPersonalizacion(formGroup) as any;

        expect(personalizacion).toMatchObject({});
      });

      it('should return IPersonalizacion', () => {
        const formGroup = service.createPersonalizacionFormGroup(sampleWithRequiredData);

        const personalizacion = service.getPersonalizacion(formGroup) as any;

        expect(personalizacion).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPersonalizacion should not enable id FormControl', () => {
        const formGroup = service.createPersonalizacionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPersonalizacion should disable id FormControl', () => {
        const formGroup = service.createPersonalizacionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

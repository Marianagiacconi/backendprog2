import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IPersonalizacion, NewPersonalizacion } from '../personalizacion.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPersonalizacion for edit and NewPersonalizacionFormGroupInput for create.
 */
type PersonalizacionFormGroupInput = IPersonalizacion | PartialWithRequiredKeyOf<NewPersonalizacion>;

type PersonalizacionFormDefaults = Pick<NewPersonalizacion, 'id'>;

type PersonalizacionFormGroupContent = {
  id: FormControl<IPersonalizacion['id'] | NewPersonalizacion['id']>;
  nombre: FormControl<IPersonalizacion['nombre']>;
  descripcion: FormControl<IPersonalizacion['descripcion']>;
  dispositivo: FormControl<IPersonalizacion['dispositivo']>;
};

export type PersonalizacionFormGroup = FormGroup<PersonalizacionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PersonalizacionFormService {
  createPersonalizacionFormGroup(personalizacion: PersonalizacionFormGroupInput = { id: null }): PersonalizacionFormGroup {
    const personalizacionRawValue = {
      ...this.getFormDefaults(),
      ...personalizacion,
    };
    return new FormGroup<PersonalizacionFormGroupContent>({
      id: new FormControl(
        { value: personalizacionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nombre: new FormControl(personalizacionRawValue.nombre, {
        validators: [Validators.required],
      }),
      descripcion: new FormControl(personalizacionRawValue.descripcion, {
        validators: [Validators.required],
      }),
      dispositivo: new FormControl(personalizacionRawValue.dispositivo),
    });
  }

  getPersonalizacion(form: PersonalizacionFormGroup): IPersonalizacion | NewPersonalizacion {
    return form.getRawValue() as IPersonalizacion | NewPersonalizacion;
  }

  resetForm(form: PersonalizacionFormGroup, personalizacion: PersonalizacionFormGroupInput): void {
    const personalizacionRawValue = { ...this.getFormDefaults(), ...personalizacion };
    form.reset(
      {
        ...personalizacionRawValue,
        id: { value: personalizacionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): PersonalizacionFormDefaults {
    return {
      id: null,
    };
  }
}

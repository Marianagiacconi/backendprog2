import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICaracteristica, NewCaracteristica } from '../caracteristica.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICaracteristica for edit and NewCaracteristicaFormGroupInput for create.
 */
type CaracteristicaFormGroupInput = ICaracteristica | PartialWithRequiredKeyOf<NewCaracteristica>;

type CaracteristicaFormDefaults = Pick<NewCaracteristica, 'id'>;

type CaracteristicaFormGroupContent = {
  id: FormControl<ICaracteristica['id'] | NewCaracteristica['id']>;
  nombre: FormControl<ICaracteristica['nombre']>;
  descripcion: FormControl<ICaracteristica['descripcion']>;
  dispositivo: FormControl<ICaracteristica['dispositivo']>;
};

export type CaracteristicaFormGroup = FormGroup<CaracteristicaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CaracteristicaFormService {
  createCaracteristicaFormGroup(caracteristica: CaracteristicaFormGroupInput = { id: null }): CaracteristicaFormGroup {
    const caracteristicaRawValue = {
      ...this.getFormDefaults(),
      ...caracteristica,
    };
    return new FormGroup<CaracteristicaFormGroupContent>({
      id: new FormControl(
        { value: caracteristicaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nombre: new FormControl(caracteristicaRawValue.nombre, {
        validators: [Validators.required],
      }),
      descripcion: new FormControl(caracteristicaRawValue.descripcion, {
        validators: [Validators.required],
      }),
      dispositivo: new FormControl(caracteristicaRawValue.dispositivo),
    });
  }

  getCaracteristica(form: CaracteristicaFormGroup): ICaracteristica | NewCaracteristica {
    return form.getRawValue() as ICaracteristica | NewCaracteristica;
  }

  resetForm(form: CaracteristicaFormGroup, caracteristica: CaracteristicaFormGroupInput): void {
    const caracteristicaRawValue = { ...this.getFormDefaults(), ...caracteristica };
    form.reset(
      {
        ...caracteristicaRawValue,
        id: { value: caracteristicaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CaracteristicaFormDefaults {
    return {
      id: null,
    };
  }
}

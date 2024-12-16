import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IAdicional, NewAdicional } from '../adicional.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAdicional for edit and NewAdicionalFormGroupInput for create.
 */
type AdicionalFormGroupInput = IAdicional | PartialWithRequiredKeyOf<NewAdicional>;

type AdicionalFormDefaults = Pick<NewAdicional, 'id' | 'dispositivos'>;

type AdicionalFormGroupContent = {
  id: FormControl<IAdicional['id'] | NewAdicional['id']>;
  nombre: FormControl<IAdicional['nombre']>;
  descripcion: FormControl<IAdicional['descripcion']>;
  precio: FormControl<IAdicional['precio']>;
  precioGratis: FormControl<IAdicional['precioGratis']>;
  dispositivos: FormControl<IAdicional['dispositivos']>;
};

export type AdicionalFormGroup = FormGroup<AdicionalFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AdicionalFormService {
  createAdicionalFormGroup(adicional: AdicionalFormGroupInput = { id: null }): AdicionalFormGroup {
    const adicionalRawValue = {
      ...this.getFormDefaults(),
      ...adicional,
    };
    return new FormGroup<AdicionalFormGroupContent>({
      id: new FormControl(
        { value: adicionalRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nombre: new FormControl(adicionalRawValue.nombre, {
        validators: [Validators.required],
      }),
      descripcion: new FormControl(adicionalRawValue.descripcion, {
        validators: [Validators.required],
      }),
      precio: new FormControl(adicionalRawValue.precio, {
        validators: [Validators.required],
      }),
      precioGratis: new FormControl(adicionalRawValue.precioGratis),
      dispositivos: new FormControl(adicionalRawValue.dispositivos ?? []),
    });
  }

  getAdicional(form: AdicionalFormGroup): IAdicional | NewAdicional {
    return form.getRawValue() as IAdicional | NewAdicional;
  }

  resetForm(form: AdicionalFormGroup, adicional: AdicionalFormGroupInput): void {
    const adicionalRawValue = { ...this.getFormDefaults(), ...adicional };
    form.reset(
      {
        ...adicionalRawValue,
        id: { value: adicionalRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): AdicionalFormDefaults {
    return {
      id: null,
      dispositivos: [],
    };
  }
}

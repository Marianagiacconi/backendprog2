import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IOpcion, NewOpcion } from '../opcion.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOpcion for edit and NewOpcionFormGroupInput for create.
 */
type OpcionFormGroupInput = IOpcion | PartialWithRequiredKeyOf<NewOpcion>;

type OpcionFormDefaults = Pick<NewOpcion, 'id'>;

type OpcionFormGroupContent = {
  id: FormControl<IOpcion['id'] | NewOpcion['id']>;
  codigo: FormControl<IOpcion['codigo']>;
  nombre: FormControl<IOpcion['nombre']>;
  descripcion: FormControl<IOpcion['descripcion']>;
  precioAdicional: FormControl<IOpcion['precioAdicional']>;
  personalizacion: FormControl<IOpcion['personalizacion']>;
};

export type OpcionFormGroup = FormGroup<OpcionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OpcionFormService {
  createOpcionFormGroup(opcion: OpcionFormGroupInput = { id: null }): OpcionFormGroup {
    const opcionRawValue = {
      ...this.getFormDefaults(),
      ...opcion,
    };
    return new FormGroup<OpcionFormGroupContent>({
      id: new FormControl(
        { value: opcionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      codigo: new FormControl(opcionRawValue.codigo, {
        validators: [Validators.required],
      }),
      nombre: new FormControl(opcionRawValue.nombre, {
        validators: [Validators.required],
      }),
      descripcion: new FormControl(opcionRawValue.descripcion, {
        validators: [Validators.required],
      }),
      precioAdicional: new FormControl(opcionRawValue.precioAdicional, {
        validators: [Validators.required],
      }),
      personalizacion: new FormControl(opcionRawValue.personalizacion),
    });
  }

  getOpcion(form: OpcionFormGroup): IOpcion | NewOpcion {
    return form.getRawValue() as IOpcion | NewOpcion;
  }

  resetForm(form: OpcionFormGroup, opcion: OpcionFormGroupInput): void {
    const opcionRawValue = { ...this.getFormDefaults(), ...opcion };
    form.reset(
      {
        ...opcionRawValue,
        id: { value: opcionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): OpcionFormDefaults {
    return {
      id: null,
    };
  }
}

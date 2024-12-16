import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDispositivo, NewDispositivo } from '../dispositivo.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDispositivo for edit and NewDispositivoFormGroupInput for create.
 */
type DispositivoFormGroupInput = IDispositivo | PartialWithRequiredKeyOf<NewDispositivo>;

type DispositivoFormDefaults = Pick<NewDispositivo, 'id' | 'adicionales'>;

type DispositivoFormGroupContent = {
  id: FormControl<IDispositivo['id'] | NewDispositivo['id']>;
  codigo: FormControl<IDispositivo['codigo']>;
  nombre: FormControl<IDispositivo['nombre']>;
  descripcion: FormControl<IDispositivo['descripcion']>;
  precioBase: FormControl<IDispositivo['precioBase']>;
  moneda: FormControl<IDispositivo['moneda']>;
  adicionales: FormControl<IDispositivo['adicionales']>;
};

export type DispositivoFormGroup = FormGroup<DispositivoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DispositivoFormService {
  createDispositivoFormGroup(dispositivo: DispositivoFormGroupInput = { id: null }): DispositivoFormGroup {
    const dispositivoRawValue = {
      ...this.getFormDefaults(),
      ...dispositivo,
    };
    return new FormGroup<DispositivoFormGroupContent>({
      id: new FormControl(
        { value: dispositivoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      codigo: new FormControl(dispositivoRawValue.codigo, {
        validators: [Validators.required],
      }),
      nombre: new FormControl(dispositivoRawValue.nombre, {
        validators: [Validators.required],
      }),
      descripcion: new FormControl(dispositivoRawValue.descripcion, {
        validators: [Validators.required],
      }),
      precioBase: new FormControl(dispositivoRawValue.precioBase, {
        validators: [Validators.required],
      }),
      moneda: new FormControl(dispositivoRawValue.moneda, {
        validators: [Validators.required],
      }),
      adicionales: new FormControl(dispositivoRawValue.adicionales ?? []),
    });
  }

  getDispositivo(form: DispositivoFormGroup): IDispositivo | NewDispositivo {
    return form.getRawValue() as IDispositivo | NewDispositivo;
  }

  resetForm(form: DispositivoFormGroup, dispositivo: DispositivoFormGroupInput): void {
    const dispositivoRawValue = { ...this.getFormDefaults(), ...dispositivo };
    form.reset(
      {
        ...dispositivoRawValue,
        id: { value: dispositivoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DispositivoFormDefaults {
    return {
      id: null,
      adicionales: [],
    };
  }
}

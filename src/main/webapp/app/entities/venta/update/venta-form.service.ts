import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IVenta, NewVenta } from '../venta.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IVenta for edit and NewVentaFormGroupInput for create.
 */
type VentaFormGroupInput = IVenta | PartialWithRequiredKeyOf<NewVenta>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IVenta | NewVenta> = Omit<T, 'fechaVenta'> & {
  fechaVenta?: string | null;
};

type VentaFormRawValue = FormValueOf<IVenta>;

type NewVentaFormRawValue = FormValueOf<NewVenta>;

type VentaFormDefaults = Pick<NewVenta, 'id' | 'fechaVenta'>;

type VentaFormGroupContent = {
  id: FormControl<VentaFormRawValue['id'] | NewVenta['id']>;
  fechaVenta: FormControl<VentaFormRawValue['fechaVenta']>;
  precioFinal: FormControl<VentaFormRawValue['precioFinal']>;
  user: FormControl<VentaFormRawValue['user']>;
};

export type VentaFormGroup = FormGroup<VentaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class VentaFormService {
  createVentaFormGroup(venta: VentaFormGroupInput = { id: null }): VentaFormGroup {
    const ventaRawValue = this.convertVentaToVentaRawValue({
      ...this.getFormDefaults(),
      ...venta,
    });
    return new FormGroup<VentaFormGroupContent>({
      id: new FormControl(
        { value: ventaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      fechaVenta: new FormControl(ventaRawValue.fechaVenta, {
        validators: [Validators.required],
      }),
      precioFinal: new FormControl(ventaRawValue.precioFinal),
      user: new FormControl(ventaRawValue.user),
    });
  }

  getVenta(form: VentaFormGroup): IVenta | NewVenta {
    return this.convertVentaRawValueToVenta(form.getRawValue() as VentaFormRawValue | NewVentaFormRawValue);
  }

  resetForm(form: VentaFormGroup, venta: VentaFormGroupInput): void {
    const ventaRawValue = this.convertVentaToVentaRawValue({ ...this.getFormDefaults(), ...venta });
    form.reset(
      {
        ...ventaRawValue,
        id: { value: ventaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): VentaFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      fechaVenta: currentTime,
    };
  }

  private convertVentaRawValueToVenta(rawVenta: VentaFormRawValue | NewVentaFormRawValue): IVenta | NewVenta {
    return {
      ...rawVenta,
      fechaVenta: dayjs(rawVenta.fechaVenta, DATE_TIME_FORMAT),
    };
  }

  private convertVentaToVentaRawValue(
    venta: IVenta | (Partial<NewVenta> & VentaFormDefaults),
  ): VentaFormRawValue | PartialWithRequiredKeyOf<NewVentaFormRawValue> {
    return {
      ...venta,
      fechaVenta: venta.fechaVenta ? venta.fechaVenta.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}

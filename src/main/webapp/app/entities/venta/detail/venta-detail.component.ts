import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IVenta } from '../venta.model';

@Component({
  standalone: true,
  selector: 'jhi-venta-detail',
  templateUrl: './venta-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class VentaDetailComponent {
  venta = input<IVenta | null>(null);

  previousState(): void {
    window.history.back();
  }
}

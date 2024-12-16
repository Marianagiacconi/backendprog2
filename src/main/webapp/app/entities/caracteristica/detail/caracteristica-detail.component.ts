import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { ICaracteristica } from '../caracteristica.model';

@Component({
  standalone: true,
  selector: 'jhi-caracteristica-detail',
  templateUrl: './caracteristica-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class CaracteristicaDetailComponent {
  caracteristica = input<ICaracteristica | null>(null);

  previousState(): void {
    window.history.back();
  }
}

import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IOpcion } from '../opcion.model';

@Component({
  standalone: true,
  selector: 'jhi-opcion-detail',
  templateUrl: './opcion-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class OpcionDetailComponent {
  opcion = input<IOpcion | null>(null);

  previousState(): void {
    window.history.back();
  }
}

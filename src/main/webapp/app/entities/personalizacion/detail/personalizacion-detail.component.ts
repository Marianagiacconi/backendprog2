import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IPersonalizacion } from '../personalizacion.model';

@Component({
  standalone: true,
  selector: 'jhi-personalizacion-detail',
  templateUrl: './personalizacion-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class PersonalizacionDetailComponent {
  personalizacion = input<IPersonalizacion | null>(null);

  previousState(): void {
    window.history.back();
  }
}

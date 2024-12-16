import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IAdicional } from '../adicional.model';

@Component({
  standalone: true,
  selector: 'jhi-adicional-detail',
  templateUrl: './adicional-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class AdicionalDetailComponent {
  adicional = input<IAdicional | null>(null);

  previousState(): void {
    window.history.back();
  }
}

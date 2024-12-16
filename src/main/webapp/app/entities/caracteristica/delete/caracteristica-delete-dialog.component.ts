import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICaracteristica } from '../caracteristica.model';
import { CaracteristicaService } from '../service/caracteristica.service';

@Component({
  standalone: true,
  templateUrl: './caracteristica-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CaracteristicaDeleteDialogComponent {
  caracteristica?: ICaracteristica;

  protected caracteristicaService = inject(CaracteristicaService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.caracteristicaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}

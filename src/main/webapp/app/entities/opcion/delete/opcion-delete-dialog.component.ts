import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IOpcion } from '../opcion.model';
import { OpcionService } from '../service/opcion.service';

@Component({
  standalone: true,
  templateUrl: './opcion-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class OpcionDeleteDialogComponent {
  opcion?: IOpcion;

  protected opcionService = inject(OpcionService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.opcionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}

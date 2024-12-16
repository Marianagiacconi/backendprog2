import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDispositivo } from '../dispositivo.model';
import { DispositivoService } from '../service/dispositivo.service';

@Component({
  standalone: true,
  templateUrl: './dispositivo-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DispositivoDeleteDialogComponent {
  dispositivo?: IDispositivo;

  protected dispositivoService = inject(DispositivoService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.dispositivoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}

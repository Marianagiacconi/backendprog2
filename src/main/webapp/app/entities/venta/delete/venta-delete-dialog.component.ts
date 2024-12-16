import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IVenta } from '../venta.model';
import { VentaService } from '../service/venta.service';

@Component({
  standalone: true,
  templateUrl: './venta-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class VentaDeleteDialogComponent {
  venta?: IVenta;

  protected ventaService = inject(VentaService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ventaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IAdicional } from '../adicional.model';
import { AdicionalService } from '../service/adicional.service';

@Component({
  standalone: true,
  templateUrl: './adicional-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class AdicionalDeleteDialogComponent {
  adicional?: IAdicional;

  protected adicionalService = inject(AdicionalService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.adicionalService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}

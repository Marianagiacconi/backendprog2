import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IPersonalizacion } from '../personalizacion.model';
import { PersonalizacionService } from '../service/personalizacion.service';

@Component({
  standalone: true,
  templateUrl: './personalizacion-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class PersonalizacionDeleteDialogComponent {
  personalizacion?: IPersonalizacion;

  protected personalizacionService = inject(PersonalizacionService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.personalizacionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDispositivo } from 'app/entities/dispositivo/dispositivo.model';
import { DispositivoService } from 'app/entities/dispositivo/service/dispositivo.service';
import { IAdicional } from '../adicional.model';
import { AdicionalService } from '../service/adicional.service';
import { AdicionalFormGroup, AdicionalFormService } from './adicional-form.service';

@Component({
  standalone: true,
  selector: 'jhi-adicional-update',
  templateUrl: './adicional-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class AdicionalUpdateComponent implements OnInit {
  isSaving = false;
  adicional: IAdicional | null = null;

  dispositivosSharedCollection: IDispositivo[] = [];

  protected adicionalService = inject(AdicionalService);
  protected adicionalFormService = inject(AdicionalFormService);
  protected dispositivoService = inject(DispositivoService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: AdicionalFormGroup = this.adicionalFormService.createAdicionalFormGroup();

  compareDispositivo = (o1: IDispositivo | null, o2: IDispositivo | null): boolean => this.dispositivoService.compareDispositivo(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adicional }) => {
      this.adicional = adicional;
      if (adicional) {
        this.updateForm(adicional);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const adicional = this.adicionalFormService.getAdicional(this.editForm);
    if (adicional.id !== null) {
      this.subscribeToSaveResponse(this.adicionalService.update(adicional));
    } else {
      this.subscribeToSaveResponse(this.adicionalService.create(adicional));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdicional>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(adicional: IAdicional): void {
    this.adicional = adicional;
    this.adicionalFormService.resetForm(this.editForm, adicional);

    this.dispositivosSharedCollection = this.dispositivoService.addDispositivoToCollectionIfMissing<IDispositivo>(
      this.dispositivosSharedCollection,
      ...(adicional.dispositivos ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.dispositivoService
      .query()
      .pipe(map((res: HttpResponse<IDispositivo[]>) => res.body ?? []))
      .pipe(
        map((dispositivos: IDispositivo[]) =>
          this.dispositivoService.addDispositivoToCollectionIfMissing<IDispositivo>(dispositivos, ...(this.adicional?.dispositivos ?? [])),
        ),
      )
      .subscribe((dispositivos: IDispositivo[]) => (this.dispositivosSharedCollection = dispositivos));
  }
}

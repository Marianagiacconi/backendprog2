import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IPersonalizacion } from 'app/entities/personalizacion/personalizacion.model';
import { PersonalizacionService } from 'app/entities/personalizacion/service/personalizacion.service';
import { IOpcion } from '../opcion.model';
import { OpcionService } from '../service/opcion.service';
import { OpcionFormGroup, OpcionFormService } from './opcion-form.service';

@Component({
  standalone: true,
  selector: 'jhi-opcion-update',
  templateUrl: './opcion-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class OpcionUpdateComponent implements OnInit {
  isSaving = false;
  opcion: IOpcion | null = null;

  personalizacionsSharedCollection: IPersonalizacion[] = [];

  protected opcionService = inject(OpcionService);
  protected opcionFormService = inject(OpcionFormService);
  protected personalizacionService = inject(PersonalizacionService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: OpcionFormGroup = this.opcionFormService.createOpcionFormGroup();

  comparePersonalizacion = (o1: IPersonalizacion | null, o2: IPersonalizacion | null): boolean =>
    this.personalizacionService.comparePersonalizacion(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ opcion }) => {
      this.opcion = opcion;
      if (opcion) {
        this.updateForm(opcion);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const opcion = this.opcionFormService.getOpcion(this.editForm);
    if (opcion.id !== null) {
      this.subscribeToSaveResponse(this.opcionService.update(opcion));
    } else {
      this.subscribeToSaveResponse(this.opcionService.create(opcion));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOpcion>>): void {
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

  protected updateForm(opcion: IOpcion): void {
    this.opcion = opcion;
    this.opcionFormService.resetForm(this.editForm, opcion);

    this.personalizacionsSharedCollection = this.personalizacionService.addPersonalizacionToCollectionIfMissing<IPersonalizacion>(
      this.personalizacionsSharedCollection,
      opcion.personalizacion,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.personalizacionService
      .query()
      .pipe(map((res: HttpResponse<IPersonalizacion[]>) => res.body ?? []))
      .pipe(
        map((personalizacions: IPersonalizacion[]) =>
          this.personalizacionService.addPersonalizacionToCollectionIfMissing<IPersonalizacion>(
            personalizacions,
            this.opcion?.personalizacion,
          ),
        ),
      )
      .subscribe((personalizacions: IPersonalizacion[]) => (this.personalizacionsSharedCollection = personalizacions));
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDispositivo } from 'app/entities/dispositivo/dispositivo.model';
import { DispositivoService } from 'app/entities/dispositivo/service/dispositivo.service';
import { IPersonalizacion } from '../personalizacion.model';
import { PersonalizacionService } from '../service/personalizacion.service';
import { PersonalizacionFormGroup, PersonalizacionFormService } from './personalizacion-form.service';

@Component({
  standalone: true,
  selector: 'jhi-personalizacion-update',
  templateUrl: './personalizacion-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class PersonalizacionUpdateComponent implements OnInit {
  isSaving = false;
  personalizacion: IPersonalizacion | null = null;

  dispositivosSharedCollection: IDispositivo[] = [];

  protected personalizacionService = inject(PersonalizacionService);
  protected personalizacionFormService = inject(PersonalizacionFormService);
  protected dispositivoService = inject(DispositivoService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: PersonalizacionFormGroup = this.personalizacionFormService.createPersonalizacionFormGroup();

  compareDispositivo = (o1: IDispositivo | null, o2: IDispositivo | null): boolean => this.dispositivoService.compareDispositivo(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ personalizacion }) => {
      this.personalizacion = personalizacion;
      if (personalizacion) {
        this.updateForm(personalizacion);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const personalizacion = this.personalizacionFormService.getPersonalizacion(this.editForm);
    if (personalizacion.id !== null) {
      this.subscribeToSaveResponse(this.personalizacionService.update(personalizacion));
    } else {
      this.subscribeToSaveResponse(this.personalizacionService.create(personalizacion));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersonalizacion>>): void {
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

  protected updateForm(personalizacion: IPersonalizacion): void {
    this.personalizacion = personalizacion;
    this.personalizacionFormService.resetForm(this.editForm, personalizacion);

    this.dispositivosSharedCollection = this.dispositivoService.addDispositivoToCollectionIfMissing<IDispositivo>(
      this.dispositivosSharedCollection,
      personalizacion.dispositivo,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.dispositivoService
      .query()
      .pipe(map((res: HttpResponse<IDispositivo[]>) => res.body ?? []))
      .pipe(
        map((dispositivos: IDispositivo[]) =>
          this.dispositivoService.addDispositivoToCollectionIfMissing<IDispositivo>(dispositivos, this.personalizacion?.dispositivo),
        ),
      )
      .subscribe((dispositivos: IDispositivo[]) => (this.dispositivosSharedCollection = dispositivos));
  }
}

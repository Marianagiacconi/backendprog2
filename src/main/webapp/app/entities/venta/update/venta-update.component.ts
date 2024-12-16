import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { IVenta } from '../venta.model';
import { VentaService } from '../service/venta.service';
import { VentaFormGroup, VentaFormService } from './venta-form.service';

@Component({
  standalone: true,
  selector: 'jhi-venta-update',
  templateUrl: './venta-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class VentaUpdateComponent implements OnInit {
  isSaving = false;
  venta: IVenta | null = null;

  usersSharedCollection: IUser[] = [];

  protected ventaService = inject(VentaService);
  protected ventaFormService = inject(VentaFormService);
  protected userService = inject(UserService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: VentaFormGroup = this.ventaFormService.createVentaFormGroup();

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ venta }) => {
      this.venta = venta;
      if (venta) {
        this.updateForm(venta);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const venta = this.ventaFormService.getVenta(this.editForm);
    if (venta.id !== null) {
      this.subscribeToSaveResponse(this.ventaService.update(venta));
    } else {
      this.subscribeToSaveResponse(this.ventaService.create(venta));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVenta>>): void {
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

  protected updateForm(venta: IVenta): void {
    this.venta = venta;
    this.ventaFormService.resetForm(this.editForm, venta);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, venta.user);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.venta?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }
}

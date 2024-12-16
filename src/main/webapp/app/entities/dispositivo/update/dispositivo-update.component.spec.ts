import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IAdicional } from 'app/entities/adicional/adicional.model';
import { AdicionalService } from 'app/entities/adicional/service/adicional.service';
import { DispositivoService } from '../service/dispositivo.service';
import { IDispositivo } from '../dispositivo.model';
import { DispositivoFormService } from './dispositivo-form.service';

import { DispositivoUpdateComponent } from './dispositivo-update.component';

describe('Dispositivo Management Update Component', () => {
  let comp: DispositivoUpdateComponent;
  let fixture: ComponentFixture<DispositivoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dispositivoFormService: DispositivoFormService;
  let dispositivoService: DispositivoService;
  let adicionalService: AdicionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DispositivoUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(DispositivoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DispositivoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dispositivoFormService = TestBed.inject(DispositivoFormService);
    dispositivoService = TestBed.inject(DispositivoService);
    adicionalService = TestBed.inject(AdicionalService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Adicional query and add missing value', () => {
      const dispositivo: IDispositivo = { id: 456 };
      const adicionales: IAdicional[] = [{ id: 13860 }];
      dispositivo.adicionales = adicionales;

      const adicionalCollection: IAdicional[] = [{ id: 6172 }];
      jest.spyOn(adicionalService, 'query').mockReturnValue(of(new HttpResponse({ body: adicionalCollection })));
      const additionalAdicionals = [...adicionales];
      const expectedCollection: IAdicional[] = [...additionalAdicionals, ...adicionalCollection];
      jest.spyOn(adicionalService, 'addAdicionalToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ dispositivo });
      comp.ngOnInit();

      expect(adicionalService.query).toHaveBeenCalled();
      expect(adicionalService.addAdicionalToCollectionIfMissing).toHaveBeenCalledWith(
        adicionalCollection,
        ...additionalAdicionals.map(expect.objectContaining),
      );
      expect(comp.adicionalsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const dispositivo: IDispositivo = { id: 456 };
      const adicionales: IAdicional = { id: 17442 };
      dispositivo.adicionales = [adicionales];

      activatedRoute.data = of({ dispositivo });
      comp.ngOnInit();

      expect(comp.adicionalsSharedCollection).toContain(adicionales);
      expect(comp.dispositivo).toEqual(dispositivo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDispositivo>>();
      const dispositivo = { id: 123 };
      jest.spyOn(dispositivoFormService, 'getDispositivo').mockReturnValue(dispositivo);
      jest.spyOn(dispositivoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dispositivo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dispositivo }));
      saveSubject.complete();

      // THEN
      expect(dispositivoFormService.getDispositivo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(dispositivoService.update).toHaveBeenCalledWith(expect.objectContaining(dispositivo));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDispositivo>>();
      const dispositivo = { id: 123 };
      jest.spyOn(dispositivoFormService, 'getDispositivo').mockReturnValue({ id: null });
      jest.spyOn(dispositivoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dispositivo: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dispositivo }));
      saveSubject.complete();

      // THEN
      expect(dispositivoFormService.getDispositivo).toHaveBeenCalled();
      expect(dispositivoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDispositivo>>();
      const dispositivo = { id: 123 };
      jest.spyOn(dispositivoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dispositivo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dispositivoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAdicional', () => {
      it('Should forward to adicionalService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(adicionalService, 'compareAdicional');
        comp.compareAdicional(entity, entity2);
        expect(adicionalService.compareAdicional).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});

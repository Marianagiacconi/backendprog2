import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IDispositivo } from 'app/entities/dispositivo/dispositivo.model';
import { DispositivoService } from 'app/entities/dispositivo/service/dispositivo.service';
import { CaracteristicaService } from '../service/caracteristica.service';
import { ICaracteristica } from '../caracteristica.model';
import { CaracteristicaFormService } from './caracteristica-form.service';

import { CaracteristicaUpdateComponent } from './caracteristica-update.component';

describe('Caracteristica Management Update Component', () => {
  let comp: CaracteristicaUpdateComponent;
  let fixture: ComponentFixture<CaracteristicaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let caracteristicaFormService: CaracteristicaFormService;
  let caracteristicaService: CaracteristicaService;
  let dispositivoService: DispositivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CaracteristicaUpdateComponent],
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
      .overrideTemplate(CaracteristicaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CaracteristicaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    caracteristicaFormService = TestBed.inject(CaracteristicaFormService);
    caracteristicaService = TestBed.inject(CaracteristicaService);
    dispositivoService = TestBed.inject(DispositivoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Dispositivo query and add missing value', () => {
      const caracteristica: ICaracteristica = { id: 456 };
      const dispositivo: IDispositivo = { id: 27917 };
      caracteristica.dispositivo = dispositivo;

      const dispositivoCollection: IDispositivo[] = [{ id: 7460 }];
      jest.spyOn(dispositivoService, 'query').mockReturnValue(of(new HttpResponse({ body: dispositivoCollection })));
      const additionalDispositivos = [dispositivo];
      const expectedCollection: IDispositivo[] = [...additionalDispositivos, ...dispositivoCollection];
      jest.spyOn(dispositivoService, 'addDispositivoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ caracteristica });
      comp.ngOnInit();

      expect(dispositivoService.query).toHaveBeenCalled();
      expect(dispositivoService.addDispositivoToCollectionIfMissing).toHaveBeenCalledWith(
        dispositivoCollection,
        ...additionalDispositivos.map(expect.objectContaining),
      );
      expect(comp.dispositivosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const caracteristica: ICaracteristica = { id: 456 };
      const dispositivo: IDispositivo = { id: 10034 };
      caracteristica.dispositivo = dispositivo;

      activatedRoute.data = of({ caracteristica });
      comp.ngOnInit();

      expect(comp.dispositivosSharedCollection).toContain(dispositivo);
      expect(comp.caracteristica).toEqual(caracteristica);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICaracteristica>>();
      const caracteristica = { id: 123 };
      jest.spyOn(caracteristicaFormService, 'getCaracteristica').mockReturnValue(caracteristica);
      jest.spyOn(caracteristicaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ caracteristica });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: caracteristica }));
      saveSubject.complete();

      // THEN
      expect(caracteristicaFormService.getCaracteristica).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(caracteristicaService.update).toHaveBeenCalledWith(expect.objectContaining(caracteristica));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICaracteristica>>();
      const caracteristica = { id: 123 };
      jest.spyOn(caracteristicaFormService, 'getCaracteristica').mockReturnValue({ id: null });
      jest.spyOn(caracteristicaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ caracteristica: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: caracteristica }));
      saveSubject.complete();

      // THEN
      expect(caracteristicaFormService.getCaracteristica).toHaveBeenCalled();
      expect(caracteristicaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICaracteristica>>();
      const caracteristica = { id: 123 };
      jest.spyOn(caracteristicaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ caracteristica });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(caracteristicaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDispositivo', () => {
      it('Should forward to dispositivoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(dispositivoService, 'compareDispositivo');
        comp.compareDispositivo(entity, entity2);
        expect(dispositivoService.compareDispositivo).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});

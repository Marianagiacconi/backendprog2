import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IDispositivo } from 'app/entities/dispositivo/dispositivo.model';
import { DispositivoService } from 'app/entities/dispositivo/service/dispositivo.service';
import { PersonalizacionService } from '../service/personalizacion.service';
import { IPersonalizacion } from '../personalizacion.model';
import { PersonalizacionFormService } from './personalizacion-form.service';

import { PersonalizacionUpdateComponent } from './personalizacion-update.component';

describe('Personalizacion Management Update Component', () => {
  let comp: PersonalizacionUpdateComponent;
  let fixture: ComponentFixture<PersonalizacionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let personalizacionFormService: PersonalizacionFormService;
  let personalizacionService: PersonalizacionService;
  let dispositivoService: DispositivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PersonalizacionUpdateComponent],
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
      .overrideTemplate(PersonalizacionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PersonalizacionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    personalizacionFormService = TestBed.inject(PersonalizacionFormService);
    personalizacionService = TestBed.inject(PersonalizacionService);
    dispositivoService = TestBed.inject(DispositivoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Dispositivo query and add missing value', () => {
      const personalizacion: IPersonalizacion = { id: 456 };
      const dispositivo: IDispositivo = { id: 20674 };
      personalizacion.dispositivo = dispositivo;

      const dispositivoCollection: IDispositivo[] = [{ id: 7551 }];
      jest.spyOn(dispositivoService, 'query').mockReturnValue(of(new HttpResponse({ body: dispositivoCollection })));
      const additionalDispositivos = [dispositivo];
      const expectedCollection: IDispositivo[] = [...additionalDispositivos, ...dispositivoCollection];
      jest.spyOn(dispositivoService, 'addDispositivoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ personalizacion });
      comp.ngOnInit();

      expect(dispositivoService.query).toHaveBeenCalled();
      expect(dispositivoService.addDispositivoToCollectionIfMissing).toHaveBeenCalledWith(
        dispositivoCollection,
        ...additionalDispositivos.map(expect.objectContaining),
      );
      expect(comp.dispositivosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const personalizacion: IPersonalizacion = { id: 456 };
      const dispositivo: IDispositivo = { id: 22456 };
      personalizacion.dispositivo = dispositivo;

      activatedRoute.data = of({ personalizacion });
      comp.ngOnInit();

      expect(comp.dispositivosSharedCollection).toContain(dispositivo);
      expect(comp.personalizacion).toEqual(personalizacion);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPersonalizacion>>();
      const personalizacion = { id: 123 };
      jest.spyOn(personalizacionFormService, 'getPersonalizacion').mockReturnValue(personalizacion);
      jest.spyOn(personalizacionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ personalizacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: personalizacion }));
      saveSubject.complete();

      // THEN
      expect(personalizacionFormService.getPersonalizacion).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(personalizacionService.update).toHaveBeenCalledWith(expect.objectContaining(personalizacion));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPersonalizacion>>();
      const personalizacion = { id: 123 };
      jest.spyOn(personalizacionFormService, 'getPersonalizacion').mockReturnValue({ id: null });
      jest.spyOn(personalizacionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ personalizacion: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: personalizacion }));
      saveSubject.complete();

      // THEN
      expect(personalizacionFormService.getPersonalizacion).toHaveBeenCalled();
      expect(personalizacionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPersonalizacion>>();
      const personalizacion = { id: 123 };
      jest.spyOn(personalizacionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ personalizacion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(personalizacionService.update).toHaveBeenCalled();
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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IPersonalizacion } from 'app/entities/personalizacion/personalizacion.model';
import { PersonalizacionService } from 'app/entities/personalizacion/service/personalizacion.service';
import { OpcionService } from '../service/opcion.service';
import { IOpcion } from '../opcion.model';
import { OpcionFormService } from './opcion-form.service';

import { OpcionUpdateComponent } from './opcion-update.component';

describe('Opcion Management Update Component', () => {
  let comp: OpcionUpdateComponent;
  let fixture: ComponentFixture<OpcionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let opcionFormService: OpcionFormService;
  let opcionService: OpcionService;
  let personalizacionService: PersonalizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OpcionUpdateComponent],
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
      .overrideTemplate(OpcionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OpcionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    opcionFormService = TestBed.inject(OpcionFormService);
    opcionService = TestBed.inject(OpcionService);
    personalizacionService = TestBed.inject(PersonalizacionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Personalizacion query and add missing value', () => {
      const opcion: IOpcion = { id: 456 };
      const personalizacion: IPersonalizacion = { id: 8288 };
      opcion.personalizacion = personalizacion;

      const personalizacionCollection: IPersonalizacion[] = [{ id: 12835 }];
      jest.spyOn(personalizacionService, 'query').mockReturnValue(of(new HttpResponse({ body: personalizacionCollection })));
      const additionalPersonalizacions = [personalizacion];
      const expectedCollection: IPersonalizacion[] = [...additionalPersonalizacions, ...personalizacionCollection];
      jest.spyOn(personalizacionService, 'addPersonalizacionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ opcion });
      comp.ngOnInit();

      expect(personalizacionService.query).toHaveBeenCalled();
      expect(personalizacionService.addPersonalizacionToCollectionIfMissing).toHaveBeenCalledWith(
        personalizacionCollection,
        ...additionalPersonalizacions.map(expect.objectContaining),
      );
      expect(comp.personalizacionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const opcion: IOpcion = { id: 456 };
      const personalizacion: IPersonalizacion = { id: 4394 };
      opcion.personalizacion = personalizacion;

      activatedRoute.data = of({ opcion });
      comp.ngOnInit();

      expect(comp.personalizacionsSharedCollection).toContain(personalizacion);
      expect(comp.opcion).toEqual(opcion);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOpcion>>();
      const opcion = { id: 123 };
      jest.spyOn(opcionFormService, 'getOpcion').mockReturnValue(opcion);
      jest.spyOn(opcionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ opcion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: opcion }));
      saveSubject.complete();

      // THEN
      expect(opcionFormService.getOpcion).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(opcionService.update).toHaveBeenCalledWith(expect.objectContaining(opcion));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOpcion>>();
      const opcion = { id: 123 };
      jest.spyOn(opcionFormService, 'getOpcion').mockReturnValue({ id: null });
      jest.spyOn(opcionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ opcion: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: opcion }));
      saveSubject.complete();

      // THEN
      expect(opcionFormService.getOpcion).toHaveBeenCalled();
      expect(opcionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOpcion>>();
      const opcion = { id: 123 };
      jest.spyOn(opcionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ opcion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(opcionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('comparePersonalizacion', () => {
      it('Should forward to personalizacionService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(personalizacionService, 'comparePersonalizacion');
        comp.comparePersonalizacion(entity, entity2);
        expect(personalizacionService.comparePersonalizacion).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});

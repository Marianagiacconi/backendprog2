import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { CaracteristicaDetailComponent } from './caracteristica-detail.component';

describe('Caracteristica Management Detail Component', () => {
  let comp: CaracteristicaDetailComponent;
  let fixture: ComponentFixture<CaracteristicaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaracteristicaDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./caracteristica-detail.component').then(m => m.CaracteristicaDetailComponent),
              resolve: { caracteristica: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CaracteristicaDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaracteristicaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load caracteristica on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CaracteristicaDetailComponent);

      // THEN
      expect(instance.caracteristica()).toEqual(expect.objectContaining({ id: 123 }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});

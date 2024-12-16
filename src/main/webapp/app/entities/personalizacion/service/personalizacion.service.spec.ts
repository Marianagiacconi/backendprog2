import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IPersonalizacion } from '../personalizacion.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../personalizacion.test-samples';

import { PersonalizacionService } from './personalizacion.service';

const requireRestSample: IPersonalizacion = {
  ...sampleWithRequiredData,
};

describe('Personalizacion Service', () => {
  let service: PersonalizacionService;
  let httpMock: HttpTestingController;
  let expectedResult: IPersonalizacion | IPersonalizacion[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(PersonalizacionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Personalizacion', () => {
      const personalizacion = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(personalizacion).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Personalizacion', () => {
      const personalizacion = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(personalizacion).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Personalizacion', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Personalizacion', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Personalizacion', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPersonalizacionToCollectionIfMissing', () => {
      it('should add a Personalizacion to an empty array', () => {
        const personalizacion: IPersonalizacion = sampleWithRequiredData;
        expectedResult = service.addPersonalizacionToCollectionIfMissing([], personalizacion);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(personalizacion);
      });

      it('should not add a Personalizacion to an array that contains it', () => {
        const personalizacion: IPersonalizacion = sampleWithRequiredData;
        const personalizacionCollection: IPersonalizacion[] = [
          {
            ...personalizacion,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPersonalizacionToCollectionIfMissing(personalizacionCollection, personalizacion);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Personalizacion to an array that doesn't contain it", () => {
        const personalizacion: IPersonalizacion = sampleWithRequiredData;
        const personalizacionCollection: IPersonalizacion[] = [sampleWithPartialData];
        expectedResult = service.addPersonalizacionToCollectionIfMissing(personalizacionCollection, personalizacion);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(personalizacion);
      });

      it('should add only unique Personalizacion to an array', () => {
        const personalizacionArray: IPersonalizacion[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const personalizacionCollection: IPersonalizacion[] = [sampleWithRequiredData];
        expectedResult = service.addPersonalizacionToCollectionIfMissing(personalizacionCollection, ...personalizacionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const personalizacion: IPersonalizacion = sampleWithRequiredData;
        const personalizacion2: IPersonalizacion = sampleWithPartialData;
        expectedResult = service.addPersonalizacionToCollectionIfMissing([], personalizacion, personalizacion2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(personalizacion);
        expect(expectedResult).toContain(personalizacion2);
      });

      it('should accept null and undefined values', () => {
        const personalizacion: IPersonalizacion = sampleWithRequiredData;
        expectedResult = service.addPersonalizacionToCollectionIfMissing([], null, personalizacion, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(personalizacion);
      });

      it('should return initial array if no Personalizacion is added', () => {
        const personalizacionCollection: IPersonalizacion[] = [sampleWithRequiredData];
        expectedResult = service.addPersonalizacionToCollectionIfMissing(personalizacionCollection, undefined, null);
        expect(expectedResult).toEqual(personalizacionCollection);
      });
    });

    describe('comparePersonalizacion', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePersonalizacion(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePersonalizacion(entity1, entity2);
        const compareResult2 = service.comparePersonalizacion(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePersonalizacion(entity1, entity2);
        const compareResult2 = service.comparePersonalizacion(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePersonalizacion(entity1, entity2);
        const compareResult2 = service.comparePersonalizacion(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

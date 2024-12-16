import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IOpcion } from '../opcion.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../opcion.test-samples';

import { OpcionService } from './opcion.service';

const requireRestSample: IOpcion = {
  ...sampleWithRequiredData,
};

describe('Opcion Service', () => {
  let service: OpcionService;
  let httpMock: HttpTestingController;
  let expectedResult: IOpcion | IOpcion[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(OpcionService);
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

    it('should create a Opcion', () => {
      const opcion = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(opcion).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Opcion', () => {
      const opcion = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(opcion).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Opcion', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Opcion', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Opcion', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addOpcionToCollectionIfMissing', () => {
      it('should add a Opcion to an empty array', () => {
        const opcion: IOpcion = sampleWithRequiredData;
        expectedResult = service.addOpcionToCollectionIfMissing([], opcion);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(opcion);
      });

      it('should not add a Opcion to an array that contains it', () => {
        const opcion: IOpcion = sampleWithRequiredData;
        const opcionCollection: IOpcion[] = [
          {
            ...opcion,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addOpcionToCollectionIfMissing(opcionCollection, opcion);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Opcion to an array that doesn't contain it", () => {
        const opcion: IOpcion = sampleWithRequiredData;
        const opcionCollection: IOpcion[] = [sampleWithPartialData];
        expectedResult = service.addOpcionToCollectionIfMissing(opcionCollection, opcion);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(opcion);
      });

      it('should add only unique Opcion to an array', () => {
        const opcionArray: IOpcion[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const opcionCollection: IOpcion[] = [sampleWithRequiredData];
        expectedResult = service.addOpcionToCollectionIfMissing(opcionCollection, ...opcionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const opcion: IOpcion = sampleWithRequiredData;
        const opcion2: IOpcion = sampleWithPartialData;
        expectedResult = service.addOpcionToCollectionIfMissing([], opcion, opcion2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(opcion);
        expect(expectedResult).toContain(opcion2);
      });

      it('should accept null and undefined values', () => {
        const opcion: IOpcion = sampleWithRequiredData;
        expectedResult = service.addOpcionToCollectionIfMissing([], null, opcion, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(opcion);
      });

      it('should return initial array if no Opcion is added', () => {
        const opcionCollection: IOpcion[] = [sampleWithRequiredData];
        expectedResult = service.addOpcionToCollectionIfMissing(opcionCollection, undefined, null);
        expect(expectedResult).toEqual(opcionCollection);
      });
    });

    describe('compareOpcion', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareOpcion(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareOpcion(entity1, entity2);
        const compareResult2 = service.compareOpcion(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareOpcion(entity1, entity2);
        const compareResult2 = service.compareOpcion(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareOpcion(entity1, entity2);
        const compareResult2 = service.compareOpcion(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

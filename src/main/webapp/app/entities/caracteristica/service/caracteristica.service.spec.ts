import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ICaracteristica } from '../caracteristica.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../caracteristica.test-samples';

import { CaracteristicaService } from './caracteristica.service';

const requireRestSample: ICaracteristica = {
  ...sampleWithRequiredData,
};

describe('Caracteristica Service', () => {
  let service: CaracteristicaService;
  let httpMock: HttpTestingController;
  let expectedResult: ICaracteristica | ICaracteristica[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CaracteristicaService);
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

    it('should create a Caracteristica', () => {
      const caracteristica = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(caracteristica).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Caracteristica', () => {
      const caracteristica = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(caracteristica).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Caracteristica', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Caracteristica', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Caracteristica', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCaracteristicaToCollectionIfMissing', () => {
      it('should add a Caracteristica to an empty array', () => {
        const caracteristica: ICaracteristica = sampleWithRequiredData;
        expectedResult = service.addCaracteristicaToCollectionIfMissing([], caracteristica);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(caracteristica);
      });

      it('should not add a Caracteristica to an array that contains it', () => {
        const caracteristica: ICaracteristica = sampleWithRequiredData;
        const caracteristicaCollection: ICaracteristica[] = [
          {
            ...caracteristica,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCaracteristicaToCollectionIfMissing(caracteristicaCollection, caracteristica);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Caracteristica to an array that doesn't contain it", () => {
        const caracteristica: ICaracteristica = sampleWithRequiredData;
        const caracteristicaCollection: ICaracteristica[] = [sampleWithPartialData];
        expectedResult = service.addCaracteristicaToCollectionIfMissing(caracteristicaCollection, caracteristica);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(caracteristica);
      });

      it('should add only unique Caracteristica to an array', () => {
        const caracteristicaArray: ICaracteristica[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const caracteristicaCollection: ICaracteristica[] = [sampleWithRequiredData];
        expectedResult = service.addCaracteristicaToCollectionIfMissing(caracteristicaCollection, ...caracteristicaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const caracteristica: ICaracteristica = sampleWithRequiredData;
        const caracteristica2: ICaracteristica = sampleWithPartialData;
        expectedResult = service.addCaracteristicaToCollectionIfMissing([], caracteristica, caracteristica2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(caracteristica);
        expect(expectedResult).toContain(caracteristica2);
      });

      it('should accept null and undefined values', () => {
        const caracteristica: ICaracteristica = sampleWithRequiredData;
        expectedResult = service.addCaracteristicaToCollectionIfMissing([], null, caracteristica, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(caracteristica);
      });

      it('should return initial array if no Caracteristica is added', () => {
        const caracteristicaCollection: ICaracteristica[] = [sampleWithRequiredData];
        expectedResult = service.addCaracteristicaToCollectionIfMissing(caracteristicaCollection, undefined, null);
        expect(expectedResult).toEqual(caracteristicaCollection);
      });
    });

    describe('compareCaracteristica', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCaracteristica(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCaracteristica(entity1, entity2);
        const compareResult2 = service.compareCaracteristica(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCaracteristica(entity1, entity2);
        const compareResult2 = service.compareCaracteristica(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCaracteristica(entity1, entity2);
        const compareResult2 = service.compareCaracteristica(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

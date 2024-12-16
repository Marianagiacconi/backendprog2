import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDispositivo } from '../dispositivo.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../dispositivo.test-samples';

import { DispositivoService } from './dispositivo.service';

const requireRestSample: IDispositivo = {
  ...sampleWithRequiredData,
};

describe('Dispositivo Service', () => {
  let service: DispositivoService;
  let httpMock: HttpTestingController;
  let expectedResult: IDispositivo | IDispositivo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DispositivoService);
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

    it('should create a Dispositivo', () => {
      const dispositivo = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(dispositivo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Dispositivo', () => {
      const dispositivo = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(dispositivo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Dispositivo', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Dispositivo', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Dispositivo', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDispositivoToCollectionIfMissing', () => {
      it('should add a Dispositivo to an empty array', () => {
        const dispositivo: IDispositivo = sampleWithRequiredData;
        expectedResult = service.addDispositivoToCollectionIfMissing([], dispositivo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dispositivo);
      });

      it('should not add a Dispositivo to an array that contains it', () => {
        const dispositivo: IDispositivo = sampleWithRequiredData;
        const dispositivoCollection: IDispositivo[] = [
          {
            ...dispositivo,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDispositivoToCollectionIfMissing(dispositivoCollection, dispositivo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Dispositivo to an array that doesn't contain it", () => {
        const dispositivo: IDispositivo = sampleWithRequiredData;
        const dispositivoCollection: IDispositivo[] = [sampleWithPartialData];
        expectedResult = service.addDispositivoToCollectionIfMissing(dispositivoCollection, dispositivo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dispositivo);
      });

      it('should add only unique Dispositivo to an array', () => {
        const dispositivoArray: IDispositivo[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const dispositivoCollection: IDispositivo[] = [sampleWithRequiredData];
        expectedResult = service.addDispositivoToCollectionIfMissing(dispositivoCollection, ...dispositivoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const dispositivo: IDispositivo = sampleWithRequiredData;
        const dispositivo2: IDispositivo = sampleWithPartialData;
        expectedResult = service.addDispositivoToCollectionIfMissing([], dispositivo, dispositivo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dispositivo);
        expect(expectedResult).toContain(dispositivo2);
      });

      it('should accept null and undefined values', () => {
        const dispositivo: IDispositivo = sampleWithRequiredData;
        expectedResult = service.addDispositivoToCollectionIfMissing([], null, dispositivo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dispositivo);
      });

      it('should return initial array if no Dispositivo is added', () => {
        const dispositivoCollection: IDispositivo[] = [sampleWithRequiredData];
        expectedResult = service.addDispositivoToCollectionIfMissing(dispositivoCollection, undefined, null);
        expect(expectedResult).toEqual(dispositivoCollection);
      });
    });

    describe('compareDispositivo', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDispositivo(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDispositivo(entity1, entity2);
        const compareResult2 = service.compareDispositivo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDispositivo(entity1, entity2);
        const compareResult2 = service.compareDispositivo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDispositivo(entity1, entity2);
        const compareResult2 = service.compareDispositivo(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

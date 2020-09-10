import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FileService } from 'app/entities/file/file.service';
import { IFile, File } from 'app/shared/model/file.model';

describe('Service Tests', () => {
  describe('File Service', () => {
    let injector: TestBed;
    let service: FileService;
    let httpMock: HttpTestingController;
    let elemDefault: IFile;
    let expectedResult: IFile | IFile[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(FileService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new File(0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should return a list of File', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});

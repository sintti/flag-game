import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { CountriesService } from './countries.service';
import { Country, CountryApiResponse } from '../models/country';
import { provideHttpClient } from '@angular/common/http';

describe('CountriesService', () => {
  let service: CountriesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CountriesService,
        provideHttpClientTesting(),
        provideHttpClient(),
      ],
    });
    service = TestBed.inject(CountriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

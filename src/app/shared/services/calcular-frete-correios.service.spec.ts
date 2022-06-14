import { TestBed } from '@angular/core/testing';

import { CalcularFreteCorreiosService } from './calcular-frete-correios.service';

describe('CalcularFreteCorreiosService', () => {
  let service: CalcularFreteCorreiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalcularFreteCorreiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { EnviarEmailService } from './enviar-email.service';

describe('EnviarEmailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnviarEmailService = TestBed.get(EnviarEmailService);
    expect(service).toBeTruthy();
  });
});

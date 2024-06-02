import { TestBed } from '@angular/core/testing';

import { LoginValidator } from './login.validator';

describe('LoginValidator', () => {
  let Validator: LoginValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    Validator = TestBed.inject(LoginValidator);
  });

  it('should be created', () => {
    expect(Validator).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUpsertCompanyComponent } from './app-upsert-company.component';

describe('AppNewCompanyComponent', () => {
  let component: AppUpsertCompanyComponent;
  let fixture: ComponentFixture<AppUpsertCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppUpsertCompanyComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AppUpsertCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

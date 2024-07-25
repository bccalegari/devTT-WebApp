import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralContainerComponent } from './central-container.component';

describe('CentralContainerComponent', () => {
  let component: CentralContainerComponent;
  let fixture: ComponentFixture<CentralContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentralContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CentralContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

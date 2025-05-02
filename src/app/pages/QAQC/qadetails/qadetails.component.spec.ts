import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QADetailsComponent } from './qadetails.component';

describe('QADetailsComponent', () => {
  let component: QADetailsComponent;
  let fixture: ComponentFixture<QADetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QADetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QADetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

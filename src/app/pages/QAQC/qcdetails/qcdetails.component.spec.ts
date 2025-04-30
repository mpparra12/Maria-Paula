import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QCDetailsComponent } from './qcdetails.component';

describe('QCDetailsComponent', () => {
  let component: QCDetailsComponent;
  let fixture: ComponentFixture<QCDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QCDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QCDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

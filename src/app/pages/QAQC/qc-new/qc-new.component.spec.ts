import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QCNewComponent } from './qc-new.component';

describe('QCNewComponent', () => {
  let component: QCNewComponent;
  let fixture: ComponentFixture<QCNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QCNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QCNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

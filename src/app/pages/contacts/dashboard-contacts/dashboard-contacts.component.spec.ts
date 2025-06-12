import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardContactsComponent } from './dashboard-contacts.component';

describe('DashboardContactsComponent', () => {
  let component: DashboardContactsComponent;
  let fixture: ComponentFixture<DashboardContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardContactsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

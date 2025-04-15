import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProposalComponent } from './dashboard-proposal.component';

describe('DashboardProposalComponent', () => {
  let component: DashboardProposalComponent;
  let fixture: ComponentFixture<DashboardProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProposalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

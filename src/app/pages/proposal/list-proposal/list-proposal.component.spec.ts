import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProposalComponent } from './list-proposal.component';

describe('ListProposalComponent', () => {
  let component: ListProposalComponent;
  let fixture: ComponentFixture<ListProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProposalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

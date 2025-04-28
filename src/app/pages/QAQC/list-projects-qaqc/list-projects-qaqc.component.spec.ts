import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjectsQAQCComponent } from './list-projects-qaqc.component';

describe('ListProjectsQAQCComponent', () => {
  let component: ListProjectsQAQCComponent;
  let fixture: ComponentFixture<ListProjectsQAQCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProjectsQAQCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListProjectsQAQCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

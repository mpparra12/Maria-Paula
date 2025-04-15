import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatCardModule} from '@angular/material/card';
import { ListClientsComponent } from './list-clients.component';

describe('ListClientsComponent', () => {
  let component: ListClientsComponent;
  let fixture: ComponentFixture<ListClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListClientsComponent,MatCardModule,]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

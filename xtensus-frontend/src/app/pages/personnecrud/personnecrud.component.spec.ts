import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonneCrudComponent } from './personnecrud.component';

describe('PersonneCrudComponent', () => {
  let component: PersonneCrudComponent;
  let fixture: ComponentFixture<PersonneCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonneCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonneCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

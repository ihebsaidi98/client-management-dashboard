import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonneUpdateComponentComponent } from './personne-update-component.component';

describe('PersonneUpdateComponentComponent', () => {
  let component: PersonneUpdateComponentComponent;
  let fixture: ComponentFixture<PersonneUpdateComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonneUpdateComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonneUpdateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

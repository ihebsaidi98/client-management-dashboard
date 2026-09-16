import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GouvernoratCrudComponent } from './gouvernorat-crud.component';

describe('GouvernoratCrudComponent', () => {
  let component: GouvernoratCrudComponent;
  let fixture: ComponentFixture<GouvernoratCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GouvernoratCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GouvernoratCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonneDialogComponent } from './add-personne-dialog.component';

describe('AddPersonneDialogComponent', () => {
  let component: AddPersonneDialogComponent;
  let fixture: ComponentFixture<AddPersonneDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPersonneDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPersonneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

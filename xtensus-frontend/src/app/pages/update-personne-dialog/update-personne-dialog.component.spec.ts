import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePersonneDialogComponent } from './update-personne-dialog.component';

describe('UpdatePersonneDialogComponent', () => {
  let component: UpdatePersonneDialogComponent;
  let fixture: ComponentFixture<UpdatePersonneDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePersonneDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePersonneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GouvernoratConfirmationDialogComponent } from './gouvernorat-confirmation-dialog.component';

describe('GouvernoratConfirmationDialogComponent', () => {
  let component: GouvernoratConfirmationDialogComponent;
  let fixture: ComponentFixture<GouvernoratConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GouvernoratConfirmationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GouvernoratConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

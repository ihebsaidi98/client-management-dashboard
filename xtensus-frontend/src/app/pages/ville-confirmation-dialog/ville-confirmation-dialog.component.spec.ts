import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VilleConfirmationDialogComponent } from './ville-confirmation-dialog.component';

describe('VilleConfirmationDialogComponent', () => {
  let component: VilleConfirmationDialogComponent;
  let fixture: ComponentFixture<VilleConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VilleConfirmationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VilleConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

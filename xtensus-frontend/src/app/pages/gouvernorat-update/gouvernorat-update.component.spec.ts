import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GouvernoratUpdateComponent } from './gouvernorat-update.component';

describe('GouvernoratUpdateComponent', () => {
  let component: GouvernoratUpdateComponent;
  let fixture: ComponentFixture<GouvernoratUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GouvernoratUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GouvernoratUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

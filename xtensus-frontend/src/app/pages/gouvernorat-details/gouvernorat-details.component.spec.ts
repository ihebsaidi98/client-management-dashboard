import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GouvernoratDetailsComponent } from './gouvernorat-details.component';

describe('GouvernoratDetailsComponent', () => {
  let component: GouvernoratDetailsComponent;
  let fixture: ComponentFixture<GouvernoratDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GouvernoratDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GouvernoratDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

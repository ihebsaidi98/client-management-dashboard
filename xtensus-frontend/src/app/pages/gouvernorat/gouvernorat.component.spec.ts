import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GouvernoratComponent } from './gouvernorat.component';

describe('GouvernoratComponent', () => {
  let component: GouvernoratComponent;
  let fixture: ComponentFixture<GouvernoratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GouvernoratComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GouvernoratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

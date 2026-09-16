import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutGouvernoratComponent } from './ajout-gouvernorat.component';

describe('AjoutGouvernoratComponent', () => {
  let component: AjoutGouvernoratComponent;
  let fixture: ComponentFixture<AjoutGouvernoratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutGouvernoratComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutGouvernoratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

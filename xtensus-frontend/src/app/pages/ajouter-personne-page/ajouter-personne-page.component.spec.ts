import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterPersonnePageComponent } from './ajouter-personne-page.component';

describe('AjouterPersonnePageComponent', () => {
  let component: AjouterPersonnePageComponent;
  let fixture: ComponentFixture<AjouterPersonnePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterPersonnePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterPersonnePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterVillePageComponent } from './ajouter-ville-page.component';

describe('AjouterVillePageComponent', () => {
  let component: AjouterVillePageComponent;
  let fixture: ComponentFixture<AjouterVillePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterVillePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterVillePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

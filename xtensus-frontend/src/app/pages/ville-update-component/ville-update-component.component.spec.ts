import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VilleUpdateComponentComponent } from './ville-update-component.component';

describe('VilleUpdateComponentComponent', () => {
  let component: VilleUpdateComponentComponent;
  let fixture: ComponentFixture<VilleUpdateComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VilleUpdateComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VilleUpdateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

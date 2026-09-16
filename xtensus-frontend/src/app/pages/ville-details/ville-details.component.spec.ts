import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VilleDetailsComponent } from './ville-details.component';

describe('VilleDetailsComponent', () => {
  let component: VilleDetailsComponent;
  let fixture: ComponentFixture<VilleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VilleDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VilleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

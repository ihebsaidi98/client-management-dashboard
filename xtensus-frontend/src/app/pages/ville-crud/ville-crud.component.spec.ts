import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VilleCrudComponent } from './ville-crud.component';

describe('VilleCrudComponent', () => {
  let component: VilleCrudComponent;
  let fixture: ComponentFixture<VilleCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VilleCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VilleCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

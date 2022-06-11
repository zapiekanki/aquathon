import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HydroPointComponent } from './hydro-point.component';

describe('HydroPointComponent', () => {
  let component: HydroPointComponent;
  let fixture: ComponentFixture<HydroPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HydroPointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HydroPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

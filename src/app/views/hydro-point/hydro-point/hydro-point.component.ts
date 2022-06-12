import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EMPTY, Observable, take } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StateService } from '../../../services/state.service';
import { HydroPoint } from '../../../models/hydro-point.model';
import { HydroPointService } from '../../../services/hydro-point.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-hydro-point',
  templateUrl: './hydro-point.component.html',
})
export class HydroPointComponent implements OnInit {
  activeHydroPoint$: Observable<HydroPoint> = EMPTY;
  activeHydroPoint!: HydroPoint;
  formGroup!: FormGroup;

  constructor(
    private readonly stateService: StateService,
    private readonly hydroPointService: HydroPointService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.activeHydroPoint$ = this.stateService.activeHydroPoint$;
    this.activeHydroPoint$.pipe(take(1)).subscribe((hydroPoint) => {
      this.activeHydroPoint = hydroPoint;
      this.cd.detectChanges();
      this.initForm();
    });
  }

  initForm() {
    this.formGroup = this.fb.group({
      waterAvailable: [
        { value: this.activeHydroPoint.water.available, disabled: true },
      ],
      waterLocked: this.activeHydroPoint.water.lock,
    });
  }

  toggleWaterLock($event: MatSlideToggleChange) {
    void this.hydroPointService.toggleWaterLock(
      this.activeHydroPoint,
      $event.checked
    );
  }
}

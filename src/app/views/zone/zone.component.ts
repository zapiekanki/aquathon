import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Zone } from '../../models/zone.model';
import { StateService } from '../../services/state.service';
import { EMPTY, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ZoneService } from '../../services/zone.service';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
})
export class ZoneComponent implements OnInit {
  activeZone$: Observable<Zone> = EMPTY;
  activeZone!: Zone;
  formGroup!: FormGroup;
  waterAvailable = false;

  constructor(
    private readonly stateService: StateService,
    private readonly zoneService: ZoneService,
    private readonly cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.activeZone$ = this.stateService.activeZone$;
    this.activeZone$.pipe().subscribe((zone) => {
      this.activeZone = zone;
      this.waterAvailable = !!zone.water.lock;
      this.cd.detectChanges();
    });
  }

  onWaterAvailableChange(value: any) {
    this.zoneService
      .updateWaterZone(this.activeZone.id, 'lock', value)
      .then((res) => console.log(res));
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { WaterMeter } from '../../models/water-meter.model';
import { WaterMeterService } from '../../services/water-meter.service';

@Component({
  selector: 'app-water-meter',
  templateUrl: './water-meter.component.html',
  styleUrls: ['./water-meter.component.css'],
})
export class WaterMeterComponent implements OnInit {
  waterMeter = new WaterMeter();
  createdAt: any;
  updatedAt: any;

  constructor(
    private readonly stateService: StateService,
    private readonly waterMeterService: WaterMeterService,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.stateService.selectedWaterMeter$.subscribe((waterMeter) => {
      this.waterMeter = waterMeter;
      this.createdAt = this.waterMeter.createdAt?.toDate();
      this.updatedAt = this.waterMeter.updatedAt?.toDate();
      this.cd.detectChanges();
    });
  }

  onWaterLockChange(lock: boolean) {
    this.waterMeter.water.lock = lock;
    this.waterMeterService
      .updateWaterMeterLock(this.waterMeter.id!, lock)
      .then();
    this.waterMeter.calculateColor();
  }
}

import { Component } from '@angular/core';
import { HydroPointService } from './services/hydro-point.service';
import { ValveService } from './services/valve.service';
import { WaterMeterService } from './services/water-meter.service';
import { ZoneService } from './services/zone.service';
import { SensorService } from './services/sensor.service';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hydroPoints$;
  valves$;
  zones$;
  sensors$;
  isZoneVisible = false;
  isWaterMeterSelected = false;
  isHydroPointVisible = false;

  constructor(
    private readonly hydroPointsService: HydroPointService,
    private readonly valveService: ValveService,
    private readonly waterMeterService: WaterMeterService,
    private readonly zoneService: ZoneService,
    private readonly sensorService: SensorService,
    private readonly stateService: StateService
  ) {
    this.valves$ = this.valveService.valves$;
    this.hydroPoints$ = this.hydroPointsService.hydroPoints$;
    this.zones$ = this.zoneService.zones$;
    this.sensors$ = this.sensorService.sensors$;

    this.stateService.activeZone$.subscribe((zone) => {
      this.isZoneVisible = !!zone.id;
    });

    this.stateService.selectedWaterMeter$.subscribe((waterMeter) => {
      this.isWaterMeterSelected = !!waterMeter.zoneRef;
    });

    this.stateService.activeHydroPoint$.subscribe((hydroPoint) => {
      this.isHydroPointVisible = !!hydroPoint.name;
    });
  }
}

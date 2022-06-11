import { Component } from '@angular/core';
import { HydroPointService } from './services/hydro-point.service';
import { ValveService } from './services/valve.service';
import { WaterMeterService } from './services/water-meter.service';
import { ZoneService } from './services/zone.service';
import { SensorService } from './services/sensor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hydroPoints$;
  valves$;
  waterMeters$;
  zones$;
  sensors$;

  constructor(
    private readonly hydroPointsService: HydroPointService,
    private readonly valveService: ValveService,
    private readonly waterMeterService: WaterMeterService,
    private readonly zoneService: ZoneService,
    private readonly sensorService: SensorService
  ) {
    this.valves$ = this.valveService.valves$;
    this.hydroPoints$ = this.hydroPointsService.hydroPoints$;
    this.waterMeters$ = this.waterMeterService.waterMeters$;
    this.zones$ = this.zoneService.zones$;
    this.sensors$ = this.sensorService.sensors$;

    this.zones$.subscribe((res) => console.log('ZONES', res));
  }
}

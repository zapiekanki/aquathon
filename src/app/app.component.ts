import { Component } from '@angular/core';
import { HydroPointService } from './services/hydro-point.service';
import { ValveService } from './services/valve.service';
import { WaterMeterService } from './services/water-meter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hydroPoints$;
  valves$;
  waterMeters$;

  constructor(
    private readonly hydroPointsService: HydroPointService,
    private readonly valveService: ValveService,
    private readonly waterMeterService: WaterMeterService
  ) {
    this.valves$ = this.valveService.valves$;
    this.hydroPoints$ = this.hydroPointsService.hydroPoints$;
    this.waterMeters$ = this.waterMeterService.waterMeters$;
  }
}

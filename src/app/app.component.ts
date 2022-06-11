import { Component, ElementRef, ViewChild } from '@angular/core';
import { HydroPointService } from './services/hydro-point.service';
import { ValveService } from './services/valve.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hydroPoints$;
  valves$;

  constructor(
    private readonly hydroPointsService: HydroPointService,
    private readonly valveService: ValveService
  ) {
    this.valves$ = this.valveService.valves$;
    this.hydroPoints$ = this.hydroPointsService.hydroPoints$;
  }
}

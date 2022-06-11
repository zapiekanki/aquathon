import { Component } from '@angular/core';
import { HydroPointService } from './services/hydro-point.service';
import { ValveService } from './services/valve.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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

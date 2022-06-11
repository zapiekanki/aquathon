import { Injectable } from '@angular/core';
import { Zone } from '../models/zone.model';
import { Subject } from 'rxjs';
import { HydroPoint } from "../models/hydro-point.model";
import { BehaviorSubject } from 'rxjs';
import { WaterMeter } from '../models/water-meter.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private activeZoneSubject = new BehaviorSubject(new Zone());
  private activeZone!: Zone;
  activeZone$ = this.activeZoneSubject.asObservable();

  private selectedWaterMeterSubject = new BehaviorSubject(new WaterMeter());
  selectedWaterMeter$ = this.selectedWaterMeterSubject.asObservable();

  selectWaterMeter(waterMeter: WaterMeter) {
    this.selectedWaterMeterSubject.next(waterMeter);
  }

  private activeHydroPointSubject = new Subject<HydroPoint>();
  activeHydroPoint$ = this.activeHydroPointSubject.asObservable();

  private activeHydroPoint!: HydroPoint;

  setActiveZone(zone: Zone) {
    this.activeZone = zone;
    this.activeZoneSubject.next(this.activeZone);
  }

  getActiveZone(): Zone {
    return this.activeZone;
  }

  setActiveHydroPoint(hydroPoint: HydroPoint) {
    this.activeHydroPoint = hydroPoint;
    this.activeHydroPointSubject.next(this.activeHydroPoint);
  }

  getActiveHydroPoint(): HydroPoint {
    return this.activeHydroPoint;
  }
}

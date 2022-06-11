import { Injectable } from '@angular/core';
import { Zone } from '../models/zone.model';
import { Subject } from 'rxjs';
import { HydroPoint } from "../models/hydro-point.model";

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private activeZoneSubject = new Subject<Zone>();
  activeZone$ = this.activeZoneSubject.asObservable();

  private activeZone!: Zone;

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

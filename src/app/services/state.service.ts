import { Injectable } from '@angular/core';
import { Zone } from '../models/zone.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private activeZoneSubject = new Subject<Zone>();
  activeZone$ = this.activeZoneSubject.asObservable();

  private activeZone: Zone | undefined;

  setActiveZone(zone: Zone) {
    this.activeZone = zone;
    this.activeZoneSubject.next(this.activeZone);
  }

  getActiveZone(): Zone {
    return new Zone();
  }
}

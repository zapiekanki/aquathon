import { Injectable } from '@angular/core';
import { Zone } from '../models/zone.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private activeZone: Zone | undefined;

  setActiveZone(zone: Zone) {
    this.activeZone = zone;
  }

  getActiveZone(): Zone {
    return new Zone();
  }
}

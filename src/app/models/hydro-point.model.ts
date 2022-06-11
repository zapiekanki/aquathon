import { DocumentData, Reference } from '@angular/fire/compat/firestore';
import { MapPoint } from './map-point.model';
import { Water } from './water-meter.model';

export class HydroPoint {
  description = '';
  dependentPoints: Reference<any>[] = [];
  name = '';
  point = new MapPoint(0, 0);
  type = '';
  water: Water = {};

  static fromDocumentData(data: DocumentData) {
    const model = new HydroPoint();
    model.point = MapPoint.fromGeoPoint(data['point']);
    model.name = data['name'];
    model.type = data['type'];
    model.description = data['description'];
    model.dependentPoints = data['dependentPoints'];
    model.water = data['water'];
    return model;
  }
}

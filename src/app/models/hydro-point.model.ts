import { DocumentData } from '@angular/fire/compat/firestore';
import { MapPoint } from "./map-point.model";

type DependentPoint = any;

export class HydroPoint {
  description = '';
  dependentPoints: DependentPoint[] = [];
  name = '';
  point = new MapPoint(0, 0);
  type = '';

  static fromDocumentData(data: DocumentData) {
    const model = new HydroPoint();
    model.point = MapPoint.fromGeoPoint(data['point']);
    model.name = data['name'];
    model.type = data['type'];
    model.description = data['description'];
    model.dependentPoints = ['hereWillBeDependentPoint'];

    return model;
  }
}

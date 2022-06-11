import { DocumentData, Reference } from '@angular/fire/compat/firestore';
import { GeoPoint } from 'firebase/firestore';
import { HydroPoint } from './hydro-point.model';
import { MapPoint } from "../map/models/map-point.model";

export class Zone {
  area: MapPoint[] = [];
  description = '';
  hydroPointRefs: Reference<HydroPoint>[] = [];
  waterAvailable = false;
  name = '';

  static fromDocumentData(data: DocumentData) {
    const model = new Zone();
    model.area = data['area'].map((el: GeoPoint) => this.mapGeoPointToMapPoint(el));
    model.description = data['description'];
    model.waterAvailable = data['waterAvailable'];
    model.name = data['name'];
    model.hydroPointRefs = data['hydroPointRefs'];
    return model;
  }

  static mapGeoPointToMapPoint(geoPoint: GeoPoint) {
    return {
      lat: geoPoint.latitude,
      lng: geoPoint.longitude
    }
  }
}

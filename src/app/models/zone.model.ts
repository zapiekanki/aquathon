import { DocumentData } from '@angular/fire/compat/firestore';
import { GeoPoint } from 'firebase/firestore';
import { MapPoint } from "../map/models/map-point.model";

export class Zone {
  area: MapPoint[] = [];
  description = '';
  waterAvailable = false;
  name = '';

  static fromDocumentData(data: DocumentData) {
    const model = new Zone();
    model.area = data['area'].map((el: GeoPoint) => this.mapGeoPointToMapPoint(el));
    model.description = data['description'];
    model.waterAvailable = data['waterAvailable'];
    model.name = data['name'];
    return model;
  }

  static mapGeoPointToMapPoint(geoPoint: GeoPoint) {
    return {
      lat: geoPoint.latitude,
      lng: geoPoint.longitude
    }
  }
}

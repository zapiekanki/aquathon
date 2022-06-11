import { DocumentData, Reference } from '@angular/fire/compat/firestore';
import { MapPoint } from './map-point.model';
import { Water } from './water-meter.model';

export class HydroPoint {
  id = '';
  description = '';
  dependentPoints: Reference<any>[] = [];
  name = '';
  point = new MapPoint(0, 0);
  type = '';
  water: Water = {};
  marker: google.maps.Marker | undefined;

  static fromDocumentData(id: string, data: DocumentData) {
    const model = new HydroPoint();
    model.id = id;
    model.point = MapPoint.fromGeoPoint(data['point']);
    model.name = data['name'];
    model.type = data['type'];
    model.description = data['description'];
    model.dependentPoints = data['dependentPoints'];
    model.water = data['water'];
    return model;
  }


  prepareHydroPoint(map: google.maps.Map) {
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(
        this.point.lat,
        this.point.lng
      ),
      map: map,
    });
    this.marker?.setMap(map);
    return this.marker;
  }

  // setMarkerSize(color: string) {
  // this.marker?.setOptions({strokeColor: color, fillColor: color});
  // }
}

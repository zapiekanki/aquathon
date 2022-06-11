import { GeoPoint } from 'firebase/firestore';

export class MapPoint {
  lat: number;
  lng: number;

  constructor(lat = 0, lng = 0) {
    this.lat = lat;
    this.lng = lng;
  }

  static fromGeoPoint(geoPoint: GeoPoint) {
    return {
      lat: geoPoint.latitude,
      lng: geoPoint.longitude,
    };
  }
}

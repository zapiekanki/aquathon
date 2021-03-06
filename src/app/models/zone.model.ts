import { DocumentData, Reference } from '@angular/fire/compat/firestore';
import { GeoPoint } from 'firebase/firestore';
import { HydroPoint } from './hydro-point.model';
import { MapPoint } from '../map/models/map-point.model';
import { PolygonColor } from '../map/polygon.enum';
import { Water, WaterMeter } from './water-meter.model';
import Polygon = google.maps.Polygon;

export class Zone {
  id = '';
  area: MapPoint[] = [];
  description = '';
  hydroPointRefs: Reference<HydroPoint>[] = [];
  waterAvailable = false;
  name = '';
  polygon: google.maps.Polygon | undefined;
  water: Water = {};
  waterMeters: WaterMeter[] = [];
  isActive = false;

  static fromDocumentData(id: string, data: DocumentData) {
    const model = new Zone();
    model.id = id;
    model.area = data['area'].map((el: GeoPoint) =>
      this.mapGeoPointToMapPoint(el)
    );
    model.description = data['description'];
    model.waterAvailable = data['waterAvailable'];
    model.name = data['name'];
    model.hydroPointRefs = data['hydroPointRefs'];
    model.water = data['water'];
    return model;
  }

  static mapGeoPointToMapPoint(geoPoint: GeoPoint) {
    return {
      lat: geoPoint.latitude,
      lng: geoPoint.longitude,
    };
  }

  setPolygon(polygon: Polygon) {
    this.polygon = polygon;
  }

  preparePolygon(map: google.maps.Map) {
    this.polygon = new google.maps.Polygon({
      paths: this.area,
      geodesic: true,
      strokeColor: PolygonColor.LightBlue,
      strokeOpacity: 0.7,
      strokeWeight: 2,
      clickable: true,
      fillColor: PolygonColor.LightBlue,
      fillOpacity: 0.3,
    });
    this.polygon.setMap(map as google.maps.Map);
    return this.polygon;
  }

  setPolygonColor(color: PolygonColor) {
    this.polygon?.setOptions({ strokeColor: color, fillColor: color });
  }

  calculateColor() {
    let shouldBeRed = !this.water.available || this.water.lock;
    if (!this.polygon) {
      return;
    }

    if (shouldBeRed) {
      this.polygon.setValues({
        fillColor: this.isActive ? PolygonColor.Yellow : PolygonColor.Red,
        strokeColor: PolygonColor.Red,
      });
      return;
    }

    if (this.isActive) {
      this.polygon.setValues({
        fillColor: PolygonColor.Yellow,
        strokeColor: PolygonColor.Yellow,
      });
    } else {
      this.polygon.setValues({
        fillColor: PolygonColor.LightBlue,
        strokeColor: PolygonColor.LightBlue,
      });
    }
  }
}

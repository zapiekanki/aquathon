import { DocumentData, GeoPoint } from 'firebase/firestore';
import firebase from 'firebase/compat';
import { Reference } from '@angular/fire/compat/firestore';
import { PolygonColor } from '../map/polygon.enum';
import Timestamp = firebase.firestore.Timestamp;
import Circle = google.maps.Circle;

export interface Water {
  available?: boolean;
  lock?: boolean;
  flow?: number;
}

export class WaterMeter {
  id: string | undefined;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
  zoneRef: Reference<any> | undefined;
  point = new GeoPoint(0, 0);
  water: Water = {};
  value = 0;
  circle: Circle | undefined;

  static fromDocumentData(id: string, data: DocumentData) {
    const model = new WaterMeter();
    model.id = id;
    model.createdAt = data['createdAt'];
    model.zoneRef = data['zoneRef'];
    model.updatedAt = data['updatedAt'];
    model.water = data['water'];
    model.value = data['value'];
    model.point = data['point'];
    return model;
  }

  getColor() {
    if (this.water.available && !this.water.lock) {
      return PolygonColor.Green;
    } else {
      return PolygonColor.Red;
    }
  }

  assignCircle(circle: Circle) {
    this.circle = circle;
  }

  calculateColor() {
    if (this.circle) {
      const color = this.getColor();
      this.circle.setValues({
        strokeColor: color,
        fillColor: color,
      });
    }
  }
}

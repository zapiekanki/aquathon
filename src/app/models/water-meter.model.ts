import { DocumentData, GeoPoint } from 'firebase/firestore';
import firebase from 'firebase/compat';
import { Reference } from '@angular/fire/compat/firestore';
import Timestamp = firebase.firestore.Timestamp;

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
}

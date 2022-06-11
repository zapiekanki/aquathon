import { DocumentData } from 'firebase/firestore';
import firebase from 'firebase/compat';
import { Reference } from '@angular/fire/compat/firestore';
import Timestamp = firebase.firestore.Timestamp;

export interface Water {
  available?: boolean;
  lock?: boolean;
  flow?: number;
}

export class WaterMeter {
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
  zoneRef: Reference<any> | undefined;
  water: Water = {};
  value = 0;

  static fromDocumentData(data: DocumentData) {
    const model = new WaterMeter();
    model.createdAt = data['createdAt'];
    model.zoneRef = data['zoneRef'];
    model.updatedAt = data['updatedAt'];
    model.water = data['water'];
    model.value = data['value'];
    return model;
  }
}

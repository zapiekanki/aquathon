import { DocumentData } from 'firebase/firestore';
import { Reference } from '@angular/fire/compat/firestore';
import { HydroPoint } from './hydro-point.model';

export interface WaterInfo {
  bod?: number;
  cod?: number;
  ph?: number;
}

export class Sensor {
  hydroPointRef: Reference<HydroPoint> | undefined;
  name = '';
  waterInfo: WaterInfo = {};

  static fromDocumentData(data: DocumentData) {
    const model = new Sensor();

    model.hydroPointRef = data['hydroPoint'];
    model.name = data['name'];
    model.waterInfo = data['waterInfo'];

    return model;
  }
}

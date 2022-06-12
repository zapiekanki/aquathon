import { DocumentData } from 'firebase/firestore';
import { Reference } from '@angular/fire/compat/firestore';
import { HydroPoint } from './hydro-point.model';

export interface WaterInfo {
  ammonium?: number;
  bromide?: number;
  calcium?: number;
  chloride?: number;
  chlorophyll?: number;
  coliformCounts?: number;
  crudeOil?: number;
  flourescein?: number;
  nitrate?: number;
  organicMatterCdomFdom?: number;
  pH?: number;
  refinedOil?: number;
  rhodamine?: number;
  sodium?: number;
  tryptophan?: number;
  turbidity?: number;
}

export class Sensor {
  id = '';
  hydroPointRef: Reference<HydroPoint> | undefined;
  name = '';
  waterInfo: WaterInfo = {};

  static fromDocumentData(id: string, data: DocumentData) {
    const model = new Sensor();
    model.id = id;
    model.hydroPointRef = data['hydroPoint'];
    model.name = data['name'];
    model.waterInfo = data['waterInfo'];

    return model;
  }
}

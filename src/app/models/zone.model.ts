import { DocumentData, Reference } from '@angular/fire/compat/firestore';
import { GeoPoint } from 'firebase/firestore';
import { HydroPoint } from './hydro-point.model';

export class Zone {
  area: GeoPoint[] = [];
  description = '';
  hydroPointRefs: Reference<HydroPoint>[] = [];
  waterAvailable = false;
  name = '';

  static fromDocumentData(data: DocumentData) {
    const model = new Zone();
    model.area = data['area'];
    model.description = data['description'];
    model.waterAvailable = data['waterAvailable'];
    model.name = data['name'];
    model.hydroPointRefs = data['hydroPointRefs'];
    return model;
  }
}

import { DocumentData } from '@angular/fire/compat/firestore';
import { GeoPoint } from 'firebase/firestore';

export class Zone {
  area: GeoPoint[] = [];
  description = '';
  waterAvailable = false;
  name = '';

  static fromDocumentData(data: DocumentData) {
    const model = new Zone();
    model.area = data['area'];
    model.description = data['description'];
    model.waterAvailable = data['waterAvailable'];
    model.name = data['name'];
    return model;
  }
}

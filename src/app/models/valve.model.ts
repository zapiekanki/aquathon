import { DocumentData, DocumentReference } from 'firebase/firestore';

export class Valve {
  name = '';
  open = true;
  waterAvailable = true;
  waterFlow = 0;
  hydroPointRef!: DocumentReference;

  static fromDocumentData(documentData: DocumentData) {
    const model = new Valve();
    model.name = documentData['name'];
    model.open = documentData['open'];
    model.waterAvailable = documentData['waterAvailable'];
    model.waterFlow = documentData['waterFlow'];
    model.hydroPointRef = documentData['hydroPoint'];
    return model;
  }
}

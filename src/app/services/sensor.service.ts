import { Injectable } from '@angular/core';
import { EMPTY, map, Observable } from 'rxjs';
import { Sensor } from '../models/sensor.model';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { DocumentData } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  sensors$: Observable<Sensor[]> = EMPTY;

  constructor(private readonly firestore: Firestore) {
    this.initSensorsSubscription();
  }

  private initSensorsSubscription() {
    const sensorsCollection = collection(this.firestore, 'sensor');
    this.sensors$ = collectionData<DocumentData>(sensorsCollection).pipe(
      map((documentData) =>
        documentData.map((data) => Sensor.fromDocumentData(data))
      )
    );
  }
}

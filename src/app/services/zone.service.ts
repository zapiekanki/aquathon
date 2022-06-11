import { Injectable } from '@angular/core';
import { EMPTY, map, Observable } from 'rxjs';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { WaterMeter } from '../models/water-meter.model';
import { DocumentData } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class WaterMeterService {
  waterMeters$: Observable<WaterMeter[]> = EMPTY;

  constructor(private readonly firestore: Firestore) {
    this.initWaterMetersSubscription();
  }

  private initWaterMetersSubscription() {
    const waterMetersCollection = collection(this.firestore, 'water-meter');
    this.waterMeters$ = collectionData<DocumentData>(
      waterMetersCollection
    ).pipe(
      map((documentData) =>
        documentData.map((data) => WaterMeter.fromDocumentData(data))
      )
    );
  }
}

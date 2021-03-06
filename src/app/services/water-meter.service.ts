import { Injectable } from '@angular/core';
import {
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { WaterMeter } from '../models/water-meter.model';
import {
  collection,
  CollectionReference,
  DocumentData,
} from 'firebase/firestore';
import { Zone } from '../models/zone.model';

@Injectable({
  providedIn: 'root',
})
export class WaterMeterService {
  // waterMeters$: Observable<WaterMeter[]> = EMPTY;
  waterMetersCollection: CollectionReference<DocumentData> | undefined;

  constructor(private readonly firestore: Firestore) {
    this.initWaterMetersSubscription();
  }

  private initWaterMetersSubscription() {
    this.waterMetersCollection = collection(this.firestore, 'water-meter');
    // this.waterMeters$ = collectionData<DocumentData>(
    //   this.waterMetersCollection
    // ).pipe(
    //   map((documentData) =>
    //     documentData.map((data) => WaterMeter.fromDocumentData(data))
    //   )
    // );
  }

  async getWaterMetersByZone(zone: Zone): Promise<WaterMeter[]> {
    const q = query(
      collection(this.firestore, 'water-meter'),
      where('zoneRef', '==', doc(this.firestore, `zone/${zone.id}`))
    );
    const querySnapshot = await getDocs(q);
    const docs: WaterMeter[] = [];
    querySnapshot.forEach((doc) => {
      docs.push(WaterMeter.fromDocumentData(doc.id, doc.data()));
    });
    return docs;
  }

  async updateWaterMeterLock(waterMeterId: string, value: boolean) {
    getDoc(doc(this.firestore, `water-meter/${waterMeterId}`)).then(
      (document) => {
        const data: any = document.data();
        data.water.lock = value;
        return setDoc(doc(this.firestore, `water-meter/${waterMeterId}`), {
          ...data,
        });
      }
    );
  }
}

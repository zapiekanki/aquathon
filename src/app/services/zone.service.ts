import { Injectable } from '@angular/core';
import { EMPTY, map, Observable } from 'rxjs';
import {
  collection,
  collectionSnapshots,
  doc,
  Firestore,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { DocumentData } from 'firebase/firestore';
import { Zone } from '../models/zone.model';

@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  zones$: Observable<Zone[]> = EMPTY;

  constructor(private readonly firestore: Firestore) {
    this.initWaterMetersSubscription();
  }

  private initWaterMetersSubscription() {
    const zonesCollection = collection(this.firestore, 'zone');

    this.zones$ = collectionSnapshots<DocumentData>(zonesCollection).pipe(
      // tap((doc) => console.log(doc)),
      map((documentData) =>
        documentData.map((snapshot) =>
          Zone.fromDocumentData(snapshot.id, snapshot.data())
        )
      )
    );
  }

  async updateZone(zoneId: string, propertyName: keyof Zone, value: any) {
    getDoc(doc(this.firestore, `zone/${zoneId}`)).then((document) => {
      const data = document.data();
      const ref = document.ref;

      return setDoc(doc(this.firestore, `zone/${zoneId}`), {
        ...data,
        [propertyName]: value,
      });
    });
  }
}

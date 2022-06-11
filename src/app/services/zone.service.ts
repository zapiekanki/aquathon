import { Injectable } from '@angular/core';
import { EMPTY, map, Observable } from 'rxjs';
import {
  collection,
  collectionSnapshots,
  Firestore,
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
}

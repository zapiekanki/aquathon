import { Injectable } from '@angular/core';
import { EMPTY, map, Observable } from 'rxjs';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
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
    this.zones$ = collectionData<DocumentData>(zonesCollection).pipe(
      map((documentData) =>
        documentData.map((data) => Zone.fromDocumentData(data))
      )
    );
  }
}

import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { EMPTY, map, Observable, tap } from 'rxjs';
import { HydroPoint } from '../models/hydro-point.model';
import firebase from 'firebase/compat';
import DocumentData = firebase.firestore.DocumentData;

@Injectable({
  providedIn: 'root',
})
export class HydroPointService {
  hydroPoints$: Observable<HydroPoint[]> = EMPTY;

  constructor(private readonly firestore: Firestore) {
    this.initHydroPointsSubscription();
  }

  private initHydroPointsSubscription() {
    const hydroPointsCollection = collection(this.firestore, 'hydro-point');
    this.hydroPoints$ = collectionData<DocumentData>(
      hydroPointsCollection
    ).pipe(
      map((documentData) =>
        documentData.map((data) => HydroPoint.fromDocumentData(data))
      ),
      tap((hydroPoints) => console.log('hydroPoints', hydroPoints))
    );
  }
}

import { Injectable } from '@angular/core';
import { collection, collectionSnapshots, doc, Firestore, getDoc, query, setDoc, where } from '@angular/fire/firestore';
import { EMPTY, map, Observable } from 'rxjs';
import { HydroPoint } from '../models/hydro-point.model';
import firebase from 'firebase/compat';
import { Sensor } from "../models/sensor.model";
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
    this.hydroPoints$ = collectionSnapshots<DocumentData>(
      hydroPointsCollection
    ).pipe(
      map((documentData) =>
        documentData.map((snapshot) => HydroPoint.fromDocumentData(snapshot.id, snapshot.data()))
      )
    );
  }

  async toggleWaterLock(activeHydroPoint: HydroPoint, checked: boolean) {
    getDoc(doc(this.firestore, `hydro-point/${activeHydroPoint.id}`)).then((document) => {
      const data: any = document.data();

      data.water.lock = checked;
      return setDoc(doc(this.firestore, `hydro-point/${activeHydroPoint.id}`), {
        ...data,
      });
    });
  }

  getHydroPointSensors(id: string) {
    const q = query(
      collection(this.firestore, 'sensor'),
      where('hydroPointRef', '==', doc(this.firestore, 'hydro-point', `/${id}`))
    );

    return collectionSnapshots<DocumentData>(
      q
    ).pipe(
      map((documentData) =>
        documentData.map((snapshot) => Sensor.fromDocumentData(snapshot.id, snapshot.data()))
      )
    );
  }
}

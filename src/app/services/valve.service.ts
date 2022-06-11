import { Injectable } from '@angular/core';
import { EMPTY, map, Observable } from 'rxjs';
import { Valve } from '../models/valve.model';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { DocumentData } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ValveService {
  valves$: Observable<Valve[]> = EMPTY;

  constructor(private readonly firestore: Firestore) {
    this.initValveSubscription();
  }

  private initValveSubscription() {
    const valveCollection = collection(this.firestore, 'valve');
    this.valves$ = collectionData<DocumentData>(valveCollection).pipe(
      map((documentData) =>
        documentData.map((data) => Valve.fromDocumentData(data))
      )
    );
    this.valves$.subscribe((res) => console.table(res));
  }
}

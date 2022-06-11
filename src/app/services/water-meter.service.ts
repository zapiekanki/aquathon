import { Inject, Injectable } from '@angular/core';
import { FIREBASE } from '../firebase/firebase.initializer';
import { getDatabase, ref, set } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class WaterMeterService {
  constructor(@Inject(FIREBASE) firebase: any) {
    const db = getDatabase();
    set(ref(db, 'users/' + 'userId'), {
      username: name,
      email: 'email',
      profile_picture: 'imageUrl',
    })
      .then((res) => {
        console.log(res);
        // Data saved successfully!
      })
      .catch((error) => {
        // The write failed...
      });
  }
}

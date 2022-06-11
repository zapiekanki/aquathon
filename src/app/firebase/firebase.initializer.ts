import { InjectionToken } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { firebaseConfig } from './firebase.config';

export const FIREBASE = new InjectionToken('firebase', {
  factory: () => {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    return {
      app,
      analytics,
    };
  },
});

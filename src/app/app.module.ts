import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FIREBASE} from "./firebase/firebase.initializer";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useExisting: FIREBASE
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

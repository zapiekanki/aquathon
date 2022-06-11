import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map/map.component';
import { GoogleMapsModule } from "@angular/google-maps";



@NgModule({
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
  ]
})
export class MapModule { }

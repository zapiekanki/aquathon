import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MapPoint } from "../../models/map-point.model";
import { Zone } from "../../../models/zone.model";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  @Input() set zones(zones: Zone[] | null) {
    if (zones) {
      zones.forEach(zone => this.initPolygonFromZone(zone.area));
    }
  }

  @ViewChild('mapContainer', {static: false}) gmap?: ElementRef;
  map?: google.maps.Map | null;
  lat = 50.041187;
  lng = 21.999121;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 12,
  };

  constructor() {
  }

  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap?.nativeElement,
      this.mapOptions);
  }

  initPolygonFromZone(areaPoints: MapPoint[]) {
    const polygonPath = new google.maps.Polygon({
      paths: areaPoints,
      geodesic: true,
      strokeColor: "#0088FF",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
    polygonPath.setMap(this.map as google.maps.Map);
  }
}

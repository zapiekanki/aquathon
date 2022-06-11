import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Zone } from '../../../models/zone.model';
import { PolygonColor } from '../../polygon.enum';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @Input() set zones(zones: Zone[] | null) {
    if (zones) {
      zones.forEach((zone) => this.initPolygonFromZone(zone));
    }
  }

  activeZone: Zone | undefined;

  @ViewChild('mapContainer', { static: false }) gmap?: ElementRef;
  map?: google.maps.Map | null;
  lat = 50.041187;
  lng = 21.999121;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 12,
  };

  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap?.nativeElement, this.mapOptions);
  }

  initPolygonFromZone(zone: Zone) {
    if (this.map) {
      const polygonPath = zone.preparePolygon(this.map);
      polygonPath.addListener('click', () => {
        this.setActiveZone(zone);
      });
    }
  }

  setActiveZone(zone: Zone) {
    this.activeZone?.setPolygonColor(PolygonColor.LightBlue);
    this.activeZone = zone;
    zone.setPolygonColor(PolygonColor.Yellow);
  }
}

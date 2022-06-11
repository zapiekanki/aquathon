import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Zone } from '../../../models/zone.model';
import { PolygonColor } from '../../polygon.enum';
import { HydroPoint } from "../../../models/hydro-point.model";
import MapsEventListener = google.maps.MapsEventListener;

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

  @Input() set hydroPoints(points: HydroPoint[] | null) {
    if (points) {
      points.forEach((point) => this.initHydroPoints(point));
    }
  }

  activeZone: Zone | undefined;

  @ViewChild('mapContainer', {static: false}) gmap?: ElementRef;
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
      const infoWindow = new google.maps.InfoWindow();
      const polygonPath = zone.preparePolygon(this.map);

      polygonPath.addListener('click', (event: any) => {
        console.log('POLYGON CLICKED evt', event);
        infoWindow.setContent(zone.id);
        infoWindow.setPosition(event.latLng);
        infoWindow.open(this.map);
        this.setActiveZone(zone);
      });
    }
  }

  initHydroPoints(hydroPoint: HydroPoint) {
    if (this.map) {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(hydroPoint.point.lat, hydroPoint.point.lng),
        map: this.map,
      });
      marker.addListener('click', () => {
        console.log('hydroPoint CLICKED', hydroPoint);
      });
    }
  }

  setActiveZone(zone: Zone) {
    this.activeZone?.setPolygonColor(PolygonColor.LightBlue);
    this.activeZone = zone;
    zone.setPolygonColor(PolygonColor.Yellow);
  }
}

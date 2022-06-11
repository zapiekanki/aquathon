import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Zone } from '../../../models/zone.model';
import { PolygonColor } from '../../polygon.enum';
import { WaterMeterService } from '../../../services/water-meter.service';
import { WaterMeter } from '../../../models/water-meter.model';
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
  waterMeters: WaterMeter[] = [];

  @ViewChild('mapContainer', {static: false}) gmap?: ElementRef;
  map?: google.maps.Map | null;
  lat = 50.041187;
  lng = 21.999121;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 12,
  };

  constructor(private readonly waterMeterService: WaterMeterService) {}

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
    this.waterMeterService.getWaterMetersByZone(zone).then((waterMeters) => {
      this.waterMeters = waterMeters;
      waterMeters.forEach((waterMeter) => {
        this.addWaterMeterMarker(waterMeter);
      });
    });
    zone.setPolygonColor(PolygonColor.Yellow);
  }

  addWaterMeterMarker(waterMeter: WaterMeter) {
    // waterMeter
    const { latitude: lat, longitude: lng } = waterMeter.point;
    new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 1,
      strokeWeight: 1,
      fillColor: '#FF0000',
      fillOpacity: 1,
      map: this.map,
      center: { lat, lng },
      radius: 1,
    });
  }
}

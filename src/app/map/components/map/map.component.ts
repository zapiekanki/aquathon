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
import { HydroPoint } from '../../../models/hydro-point.model';
import { Router } from '@angular/router';
import { StateService } from '../../../services/state.service';

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

  @ViewChild('mapContainer', { static: false }) gmap?: ElementRef;
  map?: google.maps.Map | null;
  lat = 50.041187;
  lng = 21.999121;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 12,
  };

  constructor(
    private readonly waterMeterService: WaterMeterService,
    private readonly router: Router,
    private readonly stateService: StateService
  ) {}

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
      google.maps.event.addListener(polygonPath, 'click', (event: any) => {
        infoWindow.setContent(zone.id);
        infoWindow.setPosition(event.latLng);
        infoWindow.open(this.map);
      });
      polygonPath.addListener('click', (poly: google.maps.Polygon) => {
        console.log('POLYGON CLICKED', poly);
        this.setActiveZone(zone);
      });
    }
  }

  initHydroPoints(hydroPoint: HydroPoint) {
    if (this.map) {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(
          hydroPoint.point.lat,
          hydroPoint.point.lng
        ),
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
    this.router.navigate(['zone']);
  }

  addWaterMeterMarker(waterMeter: WaterMeter) {
    // waterMeter
    const { latitude: lat, longitude: lng } = waterMeter.point;
    new google.maps.Circle({
      strokeColor: PolygonColor.Green,
      strokeOpacity: 1,
      strokeWeight: 1,
      fillColor: PolygonColor.Green,
      fillOpacity: 1,
      map: this.map,
      center: { lat, lng },
      radius: 2,
    });
  }
}

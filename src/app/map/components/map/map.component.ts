import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Zone } from '../../../models/zone.model';
import { WaterMeterService } from '../../../services/water-meter.service';
import { WaterMeter } from '../../../models/water-meter.model';
import { HydroPoint } from '../../../models/hydro-point.model';
import { StateService } from '../../../services/state.service';
import { distinctUntilChanged } from 'rxjs';
import Polygon = google.maps.Polygon;
import Circle = google.maps.Circle;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  polygonsCache = new Map<string, Polygon>();
  waterMetersCache = new Map<string, Circle>();

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

  @ViewChild('mapContainer', { static: false }) gmap?: ElementRef;
  map?: google.maps.Map | null;
  lat = 50.041187;
  lng = 21.999121;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 12,
    disableDefaultUI: true,
  };

  constructor(
    private readonly waterMeterService: WaterMeterService,
    private readonly stateService: StateService
  ) {}

  ngAfterViewInit() {
    this.mapInitializer();
    this.initZoneChangeSubscription();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap?.nativeElement, this.mapOptions);
  }

  initPolygonFromZone(zone: Zone) {
    if (this.polygonsCache.has(zone.id)) {
      zone.setPolygon(this.polygonsCache.get(zone.id)!);
      zone.calculateColor();
      return;
    }

    if (this.map) {
      const polygon = zone.preparePolygon(this.map);
      this.polygonsCache.set(zone.id, polygon);
      polygon.addListener('click', (poly: google.maps.Polygon) => {
        console.log('ZONE ID', zone.id);
        this.setActiveZone(zone);
      });
    }
    zone.calculateColor();
  }

  initHydroPoints(hydroPoint: HydroPoint) {
    if (this.map) {
      const pointPath = hydroPoint.prepareHydroPoint(this.map);
      this.stateService.setActiveHydroPoint(hydroPoint);
      pointPath.addListener('click', () => {
        console.log('hydroPoint CLICKED', hydroPoint);
        this.setActiveHydroPoint(hydroPoint);
      });
    }
  }

  setActiveZone(zone: Zone) {
    const activeZone = this.stateService.getActiveZone();
    if (activeZone) {
      activeZone.isActive = false;
      activeZone.calculateColor();
    }
    this.stateService.setActiveZone(zone);
    zone.isActive = true;
    zone.calculateColor();
    this.openZoneFormWindow();
  }

  setActiveHydroPoint(hydroPoint: HydroPoint) {
    this.stateService.setActiveHydroPoint(hydroPoint);
  }

  openZoneFormWindow() {
    new google.maps.InfoWindow();
  }

  initZoneChangeSubscription() {
    this.stateService.activeZone$
      .pipe(distinctUntilChanged())
      .subscribe((zone) => {
        if (zone.waterMeters.length) {
          return;
        }
        this.waterMeterService
          .getWaterMetersByZone(zone)
          .then((waterMeters) => {
            zone.waterMeters = waterMeters;
            waterMeters.forEach((waterMeter) => {
              this.setWaterMeterMarker(waterMeter);
            });
          });
      });
  }

  setWaterMeterMarker(waterMeter: WaterMeter) {
    let circle = this.waterMetersCache.get(waterMeter.id!)!;
    if (!circle) {
      const { latitude: lat, longitude: lng } = waterMeter.point;
      circle = new google.maps.Circle({
        strokeOpacity: 1,
        strokeWeight: 1,
        fillOpacity: 1,
        map: this.map,
        center: { lat, lng },
        radius: 5,
      });
      circle.addListener('click', () => {
        console.log(waterMeter.id);
        this.stateService.selectWaterMeter(waterMeter);
      });
      this.waterMetersCache.set(waterMeter.id!, circle);
    }
    waterMeter.assignCircle(circle);
    waterMeter.calculateColor();
  }
}

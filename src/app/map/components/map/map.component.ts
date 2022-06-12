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
import { StateService } from '../../../services/state.service';
import { distinctUntilChanged } from 'rxjs';
import Polygon = google.maps.Polygon;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  polygons = new Map<string, Polygon>();

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
    if (this.polygons.has(zone.id)) {
      zone.setPolygon(this.polygons.get(zone.id)!);
      return;
    }

    if (this.map) {
      const polygon = zone.preparePolygon(this.map);
      this.polygons.set(zone.id, polygon);
      polygon.addListener('click', (poly: google.maps.Polygon) => {
        console.log('ZONE ID', zone.id);
        this.setActiveZone(zone);
      });
    }
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
    activeZone?.setPolygonColor(PolygonColor.LightBlue);
    this.stateService.setActiveZone(zone);
    this.openZoneFormWindow();
    zone.setPolygonColor(PolygonColor.Yellow);
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
        console.log('this.waterMeterService.getWaterMetersByZone');
        this.waterMeterService
          .getWaterMetersByZone(zone)
          .then((waterMeters) => {
            this.waterMeters = waterMeters;
            waterMeters.forEach((waterMeter) => {
              this.addWaterMeterMarker(waterMeter);
            });
          });
      });
  }

  addWaterMeterMarker(waterMeter: WaterMeter) {
    // waterMeter
    const { latitude: lat, longitude: lng } = waterMeter.point;
    const circle = new google.maps.Circle({
      strokeColor: PolygonColor.Green,
      strokeOpacity: 1,
      strokeWeight: 1,
      fillColor: PolygonColor.Green,
      fillOpacity: 1,
      map: this.map,
      center: { lat, lng },
      radius: 2,
    });
    circle.addListener('click', () => {
      this.stateService.selectWaterMeter(waterMeter);
    });
  }
}

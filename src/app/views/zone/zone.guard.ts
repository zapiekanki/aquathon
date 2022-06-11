import { StateService } from '../../services/state.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { Zone } from '../../models/zone.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ZoneGuard implements CanActivate {
  constructor(private readonly stateService: StateService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.stateService.activeZone$.pipe(
      map<Zone, boolean>((zone) => !!zone.id)
    );
  }
}

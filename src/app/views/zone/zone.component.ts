import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Zone } from '../../models/zone.model';
import { StateService } from '../../services/state.service';
import { EMPTY, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css'],
})
export class ZoneComponent implements OnInit {
  activeZone$: Observable<Zone> = EMPTY;
  activeZone!: Zone;
  formGroup!: FormGroup;

  constructor(
    private readonly stateService: StateService,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.activeZone$ = this.stateService.activeZone$;
    this.activeZone$.pipe().subscribe((zone) => {
      this.activeZone = zone;
      this.cd.detectChanges();
    });
  }
}

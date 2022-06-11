import { Component, OnInit } from '@angular/core';
import { Zone } from '../../models/zone.model';
import { StateService } from '../../services/state.service';
import { EMPTY, Observable, take } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activeZone$ = this.stateService.activeZone$;
    this.activeZone$
      .pipe(take(1))
      .subscribe((zone) => (this.activeZone = zone));
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      waterAvailable: [this.activeZone.waterAvailable],
    });
  }
}

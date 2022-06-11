import { Component, OnInit } from '@angular/core';
import { ZoneService } from '../../services/zone.service';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css'],
})
export class ZoneComponent implements OnInit {
  constructor(private readonly zoneService: ZoneService) {}

  ngOnInit(): void {}
}

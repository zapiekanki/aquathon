import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoneComponent } from './zone.component';
import { RouterModule } from '@angular/router';
import { routes } from './zone.routing';

@NgModule({
  declarations: [ZoneComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ZoneModule {}

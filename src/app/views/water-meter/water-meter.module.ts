import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterMeterComponent } from './water-meter.component';

@NgModule({
  declarations: [WaterMeterComponent],
  exports: [WaterMeterComponent],
  imports: [CommonModule],
})
export class WaterMeterModule {}

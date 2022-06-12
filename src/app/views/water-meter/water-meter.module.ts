import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterMeterComponent } from './water-meter.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WaterMeterComponent],
  exports: [WaterMeterComponent],
  imports: [CommonModule, MatSlideToggleModule, FormsModule],
})
export class WaterMeterModule {}

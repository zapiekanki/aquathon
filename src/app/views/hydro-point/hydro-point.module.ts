import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HydroPointComponent } from './hydro-point/hydro-point.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";


@NgModule({
  declarations: [
    HydroPointComponent
  ],
  exports: [
    HydroPointComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule
  ]
})
export class HydroPointModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoneComponent } from './zone.component';
import { RouterModule } from '@angular/router';
import { routes } from './zone.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ZoneGuard } from './zone.guard';

@NgModule({
  declarations: [ZoneComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
  ],
  providers: [ZoneGuard],
})
export class ZoneModule {}

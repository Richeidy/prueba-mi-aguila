import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';

import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  exports: [
  ]
})
export class MapsModule { }

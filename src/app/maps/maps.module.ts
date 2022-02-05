import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';

import { SearchMenuModule } from './components/search-menu/search-menu.module';
import { LoadingComponent } from './components/loading/loading.component';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    LoadingComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    SearchMenuModule
  ],
  exports: [
  ]
})
export class MapsModule { }

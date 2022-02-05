import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapsPageComponent } from './maps-page/maps-page.component';

const routes: Routes = [
  {
    path: '',
    component: MapsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }

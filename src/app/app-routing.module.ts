import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorRouteComponent } from './shared/error-route/error-route.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import ('./layouts/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'map',
    loadChildren: () => import ('./maps/maps.module').then(m => m.MapsModule)
  },
  {
    path: '**',
    component: ErrorRouteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

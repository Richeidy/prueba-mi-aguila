import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultPageComponent } from 'src/app/shared/default-page/default-page.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [{
      path: '',
      redirectTo: 'map',
      pathMatch: 'full'
    },{
      path: 'map',
      loadChildren: () => import ('../../maps/maps.module').then(m => m.MapsModule)
    },{
      path: 'flights',
      component: DefaultPageComponent
    },
    {
      path: 'routes',
      component: DefaultPageComponent
    },
    {
      path: 'settings',
      component: DefaultPageComponent
    },
    {
      path: 'payment-methods',
      component: DefaultPageComponent
    },
    {
      path: 'statistics',
      component: DefaultPageComponent
    },
    {
      path: 'logout',
      component: DefaultPageComponent
    }]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

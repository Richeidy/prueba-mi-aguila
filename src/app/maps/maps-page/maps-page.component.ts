import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { MapsService } from '../services/maps.service';
import { Route, MapModel, WaypointMap } from '../../models/map.model';

@Component({
  selector: 'app-maps-page',
  templateUrl: './maps-page.component.html',
  styleUrls: ['./maps-page.component.scss']
})
export class MapsPageComponent implements OnInit  {

  readyMap: boolean = true;
  initialroute !: MapModel;
  initialPoint!: WaypointMap; 

  constructor(
    private mapService:MapsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getInitialRoute();
  }

  getInitialRoute() {
    this.mapService.getRouteInitial()
      .pipe(
        switchMap((initialPoints) => {
          this.initialPoint = initialPoints[0];
          return this.mapService.getRouteMap(initialPoints[0]);
        }),
      )
      .subscribe(route =>{
        this.initialroute = route;
      });
  }

}

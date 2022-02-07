import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { MapsService } from '../services/maps.service';
import { Route, MapModel, WaypointMap, MapWaypoint, Waypoint } from '../../models/map.model';

@Component({
  selector: 'app-maps-page',
  templateUrl: './maps-page.component.html',
  styleUrls: ['./maps-page.component.scss'],
  providers:[{
    provide: 'favoritePlaceSelected',
    useValue: new EventEmitter
  }]
})
export class MapsPageComponent implements OnInit  {
  readyMap:boolean = true;
  initialroute!: MapModel;
  initialPoints!: MapWaypoint[]; 
  favoritesPlaces!: MapWaypoint[];
  wayPointPrint!: MapWaypoint;
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
          this.initialPoints = initialPoints;
          const wayPoints: WaypointMap = {
            origin: initialPoints[0].location,
            destiny: initialPoints[1].location
          };
          return this.mapService.getRouteMap(wayPoints);
        }),
      )
      .subscribe(route =>{
        this.initialroute = route;
      });
  }

  printMarkerPlace(WayPointPlace: MapWaypoint) {
    this.wayPointPrint= WayPointPlace;
  }

}

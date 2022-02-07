import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { MapsService } from '../services/maps.service';
import { Route, MapModel, WaypointMap, MapWaypoint, Waypoint, typeCoordinates } from '../../models/map.model';

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
  printPolyLine!: MapModel;
  initialPoints!: MapWaypoint[]; 
  favoritesPlaces!: MapWaypoint[];
  wayPointPrint!: typeCoordinates;
  constructor(
    private mapService:MapsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getInitialRoute();
    this.getRoute();
  }
  
  getRoute() {
    this.activatedRoute.params.subscribe(({origin, destiny}) => {
      console.log(origin,destiny);
      if(origin && destiny) {
        const wayPointOrigin = this.mapService.getFavoritesPlacesByName(origin);
        const wayPointDestiny = this.mapService.getFavoritesPlacesByName(destiny);
        this.printPoliLineData(wayPointOrigin,wayPointDestiny);
        this.initialPoints = [wayPointOrigin,wayPointDestiny];
      }
      if(origin) {
        let wayPoint = this.mapService.getFavoritesPlacesByName(origin);
        this.printMarkerPlace({wayPoint, type: 'origin'});
      }
    });
  }

  printPoliLineData(waypointOrigin: any,waypointDestiny: any) {
    const wayPoints: WaypointMap = {
      origin: waypointOrigin[0].location,
      destiny: waypointDestiny[1].location
    };
    this.mapService.getRouteMap(wayPoints).subscribe(route => {
      this.printPolyLine = route;
    });
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
        this.printPolyLine = route;
      });
  }

  printMarkerPlace(WayPointPlace: typeCoordinates) {
    this.wayPointPrint= WayPointPlace;
  }

}

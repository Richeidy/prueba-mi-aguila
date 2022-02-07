import { Component, EventEmitter, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { MapsService } from '../services/maps.service';
import { MapModel, WaypointMap, MapWaypoint, Waypoint, typeCoordinates } from '../../models/map.model';

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
  ) { }

  ngOnInit() {
    this.getInitialRoute();
  }
  
  printPoliLineData(waypointOrigin: any,waypointDestiny: any) {
    const wayPoints: WaypointMap = {
      origin: waypointOrigin.location,
      destiny: waypointDestiny.location
    };
    this.mapService.getRouteMap(wayPoints).subscribe(route => {
      this.printPolyLine = route;
    });
  }

  onSelectedWayPoints(points: MapWaypoint[]) {
    this.printPoliLineData(points[0],points[1]);
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

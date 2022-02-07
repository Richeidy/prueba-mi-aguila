import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MapWaypoint, Waypoint } from '../../../models/map.model';
import { ActivatedRoute } from '@angular/router';
import { MapsService } from '../../services/maps.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-search-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.scss']
})
export class SearchMenuComponent implements OnInit {

  @Output() onSelectFavPlace: EventEmitter<MapWaypoint> = new EventEmitter;
  @Output() onSelectedWayPoints: EventEmitter<MapWaypoint[]> = new EventEmitter;
  
  favoritesPlaces!: MapWaypoint[];
  activePage: number = 1;
  originPlaceSelected!: MapWaypoint;
  destinyPlaceSelected!: MapWaypoint;

  constructor(
    private activatedRoute: ActivatedRoute,
    private mapService: MapsService
  ) { }

  ngOnInit(): void {

    this.getFavoritesPlaces();
    this.getRoute();
  }

  getFavoritesPlaces() {
    this.mapService.getFavoritesPlaces()
      .subscribe(placesFav => this.favoritesPlaces = placesFav);
  }

  getRoute() {
    this.activatedRoute.params.subscribe(({origin, destiny}) => {
      console.log(origin,destiny);
      if(origin && destiny) {
        this.activePage = 2;
        const WaypointOrigin = this.searchWayPointInPlaces(origin);
        const WaypointDestiny = this.searchWayPointInPlaces(destiny);
        this.emitSelectedWayPoints([WaypointOrigin,WaypointDestiny]);
      }
      if(origin) {
        const WaypointOrigin = this.searchWayPointInPlaces(origin);
        this.emitPlaceFavoriteSelected(WaypointOrigin)
      }
    });
  }

  searchWayPointInPlaces(WaypointName: string) {
    return this.favoritesPlaces.filter(place => place.name == WaypointName)[0];
  }

  emitSelectedWayPoints(wayPointsSelected: MapWaypoint[]){
    this.onSelectedWayPoints.emit(wayPointsSelected)
  }

  emitPlaceFavoriteSelected(placeFavorite: MapWaypoint) {
    if(this.activePage === 1) {
      this.originPlaceSelected = placeFavorite;
    }
    this.onSelectFavPlace.emit(placeFavorite);
  }

  changePage(value: number) {
    const activePage = this.activePage + value;
    (activePage > 2 && this.destinyPlaceSelected)
      ? this.success() 
      : this.activePage += value;
  } 

  success() {

  }
}

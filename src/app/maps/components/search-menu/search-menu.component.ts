import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MapWaypoint, typeCoordinates, Waypoint } from '../../../models/map.model';
import { ActivatedRoute } from '@angular/router';
import { MapsService } from '../../services/maps.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-search-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.scss']
})
export class SearchMenuComponent implements OnInit {

  @Output() onSelectFavPlace: EventEmitter<typeCoordinates> = new EventEmitter;
  @Output() onSelectedWayPoints: EventEmitter<MapWaypoint[]> = new EventEmitter;
  
  
  favoritesPlaces!: MapWaypoint[];
  activePage: number = 1;
  originPlaceSelected!: MapWaypoint;
  destinyPlaceSelected!: MapWaypoint;

  constructor(
    private mapService: MapsService
  ) { }

  ngOnInit() {
    this.getFavoritesPlaces();
  }

  getFavoritesPlaces() {
    this.mapService.getFavoritesPlaces().subscribe(places => this.favoritesPlaces = places);
  }
  
  emitSelectedWayPoints(wayPointsSelected: MapWaypoint[]){
    this.onSelectedWayPoints.emit(wayPointsSelected)
  }

  emitPlaceFavoriteSelected(placeFavorite: MapWaypoint) {
    if(this.activePage === 1) {
      this.originPlaceSelected = placeFavorite;
      this.onSelectFavPlace.emit({wayPoint: placeFavorite, type: 'origin'});
    }
    if(this.activePage === 2) {
      this.originPlaceSelected = placeFavorite;
      this.onSelectFavPlace.emit({wayPoint: placeFavorite, type: 'destiny'});
    }
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

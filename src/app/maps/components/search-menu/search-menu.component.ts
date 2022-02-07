import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MapWaypoint, typeCoordinates} from '../../../models/map.model';
import { MapsService } from '../../services/maps.service';

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
  navigateTo: string = "";
  constructor(
    private mapService: MapsService,
    private router: Router
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
      this.destinyPlaceSelected = placeFavorite;
      this.onSelectFavPlace.emit({wayPoint: placeFavorite, type: 'destiny'});
    }
  }

  backPage() {
    if(this.activePage > 1) {
      this.activePage -= 1;
      this.router.navigateByUrl(`dashboard/map/step/1`);
      if(this.originPlaceSelected) this.emitPlaceFavoriteSelected(this.originPlaceSelected);
    }
  }

  nextPage() {
    if(this.activePage <= 2) {
      this.router.navigateByUrl(`/dashboard/map/step/2`);
      if(this.destinyPlaceSelected) {
        this.emitPlaceFavoriteSelected(this.destinyPlaceSelected);
      }
      if(this.originPlaceSelected && this.destinyPlaceSelected) this.success();
      if(this.activePage < 2) this.activePage += 1;
    }
  }

  onChangePage(pageSelected:number) {
    if(this.originPlaceSelected) this.activePage = pageSelected;
    if(pageSelected == 1) this.emitPlaceFavoriteSelected(this.originPlaceSelected);
    if(pageSelected == 2) this.emitPlaceFavoriteSelected(this.destinyPlaceSelected);
  }

  success() {
    this.emitSelectedWayPoints([this.originPlaceSelected,this.destinyPlaceSelected])
  }
}

import { Injectable } from '@angular/core';
import { LngLatLike, Map } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  private map ?: Map; 

  constructor(
  ) { }

  private initMap() {
    //TODO: create Json
  }

  get readyMap(): boolean {
    return !!this.map;
  }

  navigateTo( coords: LngLatLike){
    if (!this.readyMap) throw Error('El mapa no esta inicializado');
    this.map?.flyTo({
      zoom: 14,
      center: coords
    });
  }














 









}

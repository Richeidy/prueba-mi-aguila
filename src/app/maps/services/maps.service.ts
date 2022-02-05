import { Injectable } from '@angular/core';
import { LngLatLike, Map } from 'mapbox-gl';
import { Observable } from 'rxjs';
import { MapModel, WaypointMap } from '../../models/map.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  private _map ?: Map; 
  private _urlApi: string = 'https://api.mapbox.com/directions/v5/mapbox/driving';
  private _accessToken: string = environment.mapboxKey;

  constructor(
    private http: HttpClient
  ) { }
  

  getRouteMap(coords: WaypointMap[]): Observable<MapModel> {
    const coordsUrl: string = `${coords[0].lon},${coords[0].lat};${coords[1].lon},${coords[2].lat}`;
    const params = new HttpParams()
      .set('alternatives', false)
      .set('geometries', 'geojson')
      .set('overview', 'simplified')
      .set('steps',false)
      .set('access_token',this._accessToken)

    return this.http.get<MapModel>(`${this._urlApi}/${coordsUrl}${params}`);
  }


  get readyMap(): boolean {
    return !!this._map;
  }

  navigateTo( coords: LngLatLike){
    if (!this.readyMap) throw Error('El mapa no esta inicializado');
    this._map?.flyTo({
      zoom: 14,
      center: coords
    });
  }














 









}

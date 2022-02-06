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
  private _apiUrl: string = 'https://api.mapbox.com/directions/v5/mapbox/driving';
  private _initialRouteUrl: string = '../../../assets/json'
  private _accessToken: string = environment.mapboxKey;

  constructor(
    private http: HttpClient
  ) { }

  getRouteInitial(): Observable<WaypointMap[]> {
    return this.http.get<WaypointMap[]>(`${this._initialRouteUrl}/initial-route.json`);
  }

  getRouteMap(coords: WaypointMap): Observable<MapModel> {

    let coordsUrl: string = `${coords.origin[0]},${coords.origin[1]};${coords.destiny[0]},${coords.destiny[1]}`;

    const params = new HttpParams()
      .set('alternatives', false)
      .set('geometries', 'geojson')
      .set('overview', 'simplified')
      .set('steps',false)
      .set('access_token',this._accessToken);
    return this.http.get<MapModel>(`${this._apiUrl}/${coordsUrl}?${params}`);
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

import { AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import { AnySourceData, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Geometry, typeCoordinates} from 'src/app/models/map.model';
import { MapModel, MapWaypoint } from '../../../models/map.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  @Input('wayPointPrint') set pointInMap(pointInMap:typeCoordinates) {
    if(pointInMap) {
      this.pointMarker(pointInMap);
      this.flyTo([pointInMap.wayPoint.location[0], pointInMap.wayPoint.location[1]]);
    }
  }
  @Input('initialPoints') set initialPoints(initialPoints:MapWaypoint[]) {
    if(initialPoints) {
      initialPoints.forEach((point, index)=> {
        const typePoint = index == 0 ? 'origin' : 'destiny'
        this.pointMarker({wayPoint: point, type: typePoint});
      });
    
    }
  }
  @Input('printPolyLine') set _route(route:MapModel) {
    if(route) {
      this.polyLineData = route.routes[0].geometry;
      this.printPolyLine(route.routes[0].geometry);
    }
  }
  polyLineData!: Geometry;
  polyLine: boolean = false;
  markerOrigin!: Marker;
  markerDestiny!: Marker; 
  map !: Map;
  isLoadedMap : boolean = false;

  constructor(
  ) { }

  ngAfterViewInit() {
    this.initMap();
  }

  initMap(){
    this.map = new Map({
      container: this.mapDivElement.nativeElement, 
      style: 'mapbox://styles/mapbox/streets-v11', 
      center: [-74.07199508835522 ,4.710934376039312], 
      zoom: 12 
    }).on('load', () => {
      this.isLoadedMap = true;
      this.printPolyLine(this.polyLineData);
    })
  }

  flyTo( coords: LngLatLike ) {
    this.map?.flyTo({
      zoom: 14,
      center: coords
    });
  }

  clearMap() {
    if(this.map.getLayer('RouteString') ) {
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
      this.clearMarkers('origin');
      this.clearMarkers('destiny');
    }
  }
  clearMarkers(marker:string) {
    if(this.markerOrigin && marker === 'origin') this.markerOrigin.remove();
    if(this.markerDestiny && marker === 'destiny') this.markerDestiny.remove();
  }
  createDataSource(geometryLine: Geometry) {
    const coords = geometryLine.coordinates;
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }
    return sourceData;
  }

  printPolyLine(geometryLine: Geometry) {
    if(this.isLoadedMap) {
      this.clearMap();
      const dataSource = this.createDataSource(geometryLine);
      this.map.addSource('RouteString', dataSource);
      this.map.addLayer({
        id: 'RouteString',
        type: 'line',
        source: 'RouteString',
        layout: {
          'line-cap': 'round',
          'line-join':'round'
        },
        paint: {
          'line-color': 'red',
          'line-width': 3
        }
      });
      this.polyLine = true;
    }
  }

  createPopup(point: MapWaypoint) {
    const popup = new Popup()
    .setHTML(`
      <h4 style="color: #566a85; font-weight: bold; font-family: 'Arimo'; margin-bottom: 5px;">
        ${ point.name }
      </h4>
      <span stylte="font-family: 'Arimo';color: var(--primary-color);">
        ${ point.direction }
      </span>
    `);
    return popup;
  }
  
  createMarker(point: MapWaypoint) {
    const popup= this.createPopup(point);
    return new Marker({color: '#0bce9d'})
      .setLngLat([point.location[0], point.location[1]])
      .setPopup(popup)
      .addTo( this.map );
  }
  
  pointMarker(point: typeCoordinates) {
    if(this.polyLine && this.markerOrigin && this.markerDestiny) {
      this.clearMap();
    }
    this.clearMarkers(point.type);
    if(point.type === 'origin') {
      this.markerOrigin = this.createMarker(point.wayPoint);
    }
    if(point.type === 'destiny') {
      this.markerDestiny = this.createMarker(point.wayPoint);
    }
  }
}

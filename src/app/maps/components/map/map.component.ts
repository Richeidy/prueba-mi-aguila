import { AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import { AnySourceData, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Geometry, Waypoint } from 'src/app/models/map.model';
import { MapsService } from '../../services/maps.service';
import { MapModel, WaypointMap, MapWaypoint } from '../../../models/map.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  @Input('pointInMap') set pointInMap(pointInMap:MapWaypoint) {
    if(pointInMap) {
      this.pointMarker(pointInMap);
    }
  }
  @Input('initialPoints') set initialPoints(initialPoints:MapWaypoint[]) {
    if(initialPoints) {
      initialPoints.forEach(point => {
        this.pointMarker(point);
      });
    }
  }
  @Input('initialroute') set _initialroute(initialroute:MapModel) {
    if(initialroute) {
      this.printPolyLine(initialroute.routes[0].geometry)
    }
  }

  map !: Map;
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
    });
  }

  flyTo( coords: LngLatLike ) {
    this.map?.flyTo({
      zoom: 14,
      center: coords
    });
  }

  clearMap() {
    if ( this.map.getLayer('RouteString') ) {
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }
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
    this.clearMap();
    const dataSource = this.createDataSource(geometryLine);
    this.map.on('load', () => {
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
      })
      .zoomIn();
    });
    
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
  
  pointMarker(point: MapWaypoint) {
    console.log(point, 'aqui');
    
    const popup= this.createPopup(point);
    this.map.on('load', () => {
      new Marker({color: '#0bce9d'})
        .setLngLat([point.location[0], point.location[1]])
        .setPopup(popup)
        .addTo( this.map );
    })
    
  }
}

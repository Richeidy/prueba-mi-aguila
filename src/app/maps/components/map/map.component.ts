import { AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { Map } from 'mapbox-gl';
import { MapsService } from '../../services/maps.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  constructor(
    private mapsService: MapsService
  ) { }

  ngAfterViewInit() {
    
    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-66.9392326 ,10.5100356,], // starting position [lng, lat]
      zoom: 14 // starting zoom
      });
  }



}

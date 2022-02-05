import { Component, OnInit } from '@angular/core';
import { MapsService } from '../services/maps.service';

@Component({
  selector: 'app-maps-page',
  templateUrl: './maps-page.component.html',
  styleUrls: ['./maps-page.component.scss']
})
export class MapsPageComponent implements OnInit  {

  readyMap: boolean = true;
  
  constructor(
    private mapService:MapsService
  ) { }

  ngOnInit() {
   // this.readyMap = this.mapService.readyMap;
  }
}

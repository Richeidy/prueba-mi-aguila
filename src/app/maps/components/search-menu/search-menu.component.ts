import { Component, Input, OnInit } from '@angular/core';
import { MapWaypoint } from '../../../models/map.model';

@Component({
  selector: 'app-search-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.scss']
})
export class SearchMenuComponent implements OnInit {

  @Input() favoritesPlaces!: MapWaypoint[];
  
  constructor() { }

  ngOnInit(): void {
  }

}

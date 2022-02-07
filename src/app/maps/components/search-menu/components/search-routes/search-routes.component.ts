import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MapWaypoint } from 'src/app/models/map.model';

type StepItem = {
  step: number,
  title: string
}

@Component({
  selector: 'app-search-routes',
  templateUrl: './search-routes.component.html',
  styleUrls: ['./search-routes.component.scss']
})

export class SearchRoutesComponent implements OnInit {
  @Input() favoritesPlaces!:MapWaypoint[];
  @Input() page!: number;
  @Output() onSelectFavoritePlace: EventEmitter<MapWaypoint> = new EventEmitter;
 
  steps: StepItem[] = [
    {
      step: 1,
      title: 'Origen'
    },{
      step: 2,
      title: 'Destino'
    },{
      step: 3,
      title: ''
    },{
      step: 4,
      title: ''
    },{
      step: 5,
      title: ''
    },{
      step: 6,
      title: ''
    }
  ]
  constructor() {
   }

  ngOnInit(): void {
    console.log(this.favoritesPlaces);
    
  }

  emitPlaceSelected(placeFavorite: MapWaypoint) {
    this.onSelectFavoritePlace.emit(placeFavorite);
  }
}

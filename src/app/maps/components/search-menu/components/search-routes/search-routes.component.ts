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
  
  @Output() onSelectFavoritePlace: EventEmitter<MapWaypoint> = new EventEmitter;
  @Output() onChangePage: EventEmitter<number> = new EventEmitter;
  @Input() favoritesPlaces!:MapWaypoint[];
  @Input('page') set _page(page:number) {
    this.page = page;
    this.placeholder = (page == 1) ? '¿Dónde te recogemos?': '¿Dónde te dejamos?'
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 100);
  }
  loading:boolean = false;
  page: number = 0;
  placeholder:string = "";
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
  }

  emitPlaceSelected(placeFavorite: MapWaypoint) {
    this.onSelectFavoritePlace.emit(placeFavorite);
  }

  changePage(step:StepItem) {
    if(step.step <= 2 ) {
      this.onChangePage.emit(step.step);
    }
  }
  
}

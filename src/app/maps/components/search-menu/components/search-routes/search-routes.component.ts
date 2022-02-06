import { Component, Input, OnInit } from '@angular/core';
import { MapWaypoint } from 'src/app/models/map.model';

type StepItem = {
  step: string,
  title: string
}

@Component({
  selector: 'app-search-routes',
  templateUrl: './search-routes.component.html',
  styleUrls: ['./search-routes.component.scss']
})

export class SearchRoutesComponent implements OnInit {
  @Input() favoritesPlaces!:MapWaypoint[];
  
  activeStepRoute: string = '1';
  steps: StepItem[] = [
    {
      step: '1',
      title: 'Origen'
    },{
      step: '2',
      title: 'Destino'
    },{
      step: '3',
      title: ''
    },{
      step: '4',
      title: ''
    },{
      step: '5',
      title: ''
    },{
      step: '6',
      title: ''
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}

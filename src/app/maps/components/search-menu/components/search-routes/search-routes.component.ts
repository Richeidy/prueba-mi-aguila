import { Component, OnInit } from '@angular/core';

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

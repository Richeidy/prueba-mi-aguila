import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  
  @Input() placeholder: string = "";
  termino: string = '';

  constructor() { }

  ngOnInit(): void {
    
  }

}

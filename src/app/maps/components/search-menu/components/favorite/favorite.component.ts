import { Component, OnInit, Input } from '@angular/core';
import { MapWaypoint } from '../../../../../models/map.model';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  @Input() place!:MapWaypoint;
 
  constructor() { }

  ngOnInit(): void {
  }

}

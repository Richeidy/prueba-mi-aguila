import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MapWaypoint } from '../../../../../models/map.model';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  @Input() place!:MapWaypoint;
  @Output() onSelectPlace: EventEmitter<MapWaypoint> = new EventEmitter;

  currentPlace!:MapWaypoint;
  constructor() { }

  ngOnInit(): void {
  }
  emitPlace() {
    this.currentPlace = this.place;
    this.onSelectPlace.emit(this.place);
  }

}

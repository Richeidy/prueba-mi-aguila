import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user.model';

type item = {
  title: string,
  icon: string,
  route:string
}

@Component({
  selector: 'sidebar-component',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  @Input() user !: User;
  items: item[] = [
    { 
      title: 'Pedir Aguila',
      icon: "directions_car",
      route: "maps"
    },
    { 
      title: 'Vuelos',
      icon: "place",
      route: "flights"
    },{ 
      title: 'Rutas',
      icon: "fork_right",
      route: "routes"
    },{ 
      title: 'Administrar',
      icon: "settings",
      route: "manage"
    },{ 
      title: 'Estadísticas',
      icon: "leaderboard",
      route: "statistics"
    },{ 
      title: 'Metodos de Pago',
      icon: "credit_card",
      route: "payment-methods"
    },{ 
      title: 'Cerrar sesion',
      icon: "logout",
      route: "maps"
    },
  ];
  currentItem: string = 'Pedir Aguila';

  constructor(
  ) { }

  ngOnInit(): void {
  }

  activeItem(item: string) {
    this.currentItem = item;
  }

  getClassItem(item: string) {
    return (this.currentItem !== item) ? 'tabs-list__item list-group-item' : 'tabs-list__item list-group-item active';
  }

}

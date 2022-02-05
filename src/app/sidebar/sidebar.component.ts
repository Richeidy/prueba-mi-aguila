import { Component, Input, OnInit } from '@angular/core';
import { isTemplateSpan } from 'typescript';
import { User } from '../models/user.model';

type Item = {
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
  items: Item[] = [
    { 
      title: 'Pedir Aguila',
      icon: "directions_car",
      route: "map"
    },{ 
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
      route: "settings"
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
      route: "logout"
    },
  ];

  currentItem: Item = this.items[0];

  constructor(
  ) { }

  ngOnInit(): void {
  }

  activeItem(item: Item) {
    this.currentItem = item;
  }

}

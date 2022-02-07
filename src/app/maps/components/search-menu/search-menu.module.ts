import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserOptionsComponent } from './components/user-options/user-options.component';
import { MatIconModule } from '@angular/material/icon';
import { SearchMenuComponent } from './search-menu.component';
import { SearchRoutesComponent } from './components/search-routes/search-routes.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { RouterModule } from '@angular/router';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SearchMenuComponent,
    UserOptionsComponent,
    SearchRoutesComponent,
    FavoriteComponent,
    SearchInputComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    SearchMenuComponent
  ]
})
export class SearchMenuModule { }

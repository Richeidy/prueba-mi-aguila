import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarModule } from './sidebar-component/sidebar.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapsModule } from './maps/maps.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    SidebarModule,
    MapsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

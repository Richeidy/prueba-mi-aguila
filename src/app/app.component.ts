import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  
  title = 'new-project';
  user !: User;

   constructor(
    private userService:UserService
  ) { }

  ngOnInit() {
    this.getUser();
    
  }

  getUser() {
    this.userService.getUser()
      .subscribe(user => {
        this.user = user;
      });    
  }
 
}

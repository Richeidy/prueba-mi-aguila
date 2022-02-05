import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl: string = '../../assets/json';
  constructor(
    private http: HttpClient
  ) { }

  getUser(): Observable<User> {
    const url = `${this.userUrl}/user.json`;
    return this.http.get<User>(url);
  }
}

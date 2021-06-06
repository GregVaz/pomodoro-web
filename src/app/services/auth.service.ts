import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Login } from '../utils/login.interface';
import { Headers } from './header';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private userService: UserService,
    private header: Headers) {}

  public async session() {
    const token = localStorage.getItem('token'); 
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.clear();
  }
}

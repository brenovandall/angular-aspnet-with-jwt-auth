import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest, LoginResponse, User } from '../models/login-request';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $user = new BehaviorSubject<User | undefined>(undefined); // that will be the user, if undefined, means that the user isnt logged in, beacuase the local storage is empty
  constructor(private http: HttpClient, private cookieService: CookieService) { } // here, im using the cookie service from the ngx

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/account/login`, { username: request.username, password: request.password }); // thats the login, the body of post method is an object with username and a password
  }

  // here, is where i store the values at local storage, so when i log in, the username value, will be stored at 'user-name' key, so if need to modify or work with its value, i to use the assignature
  setUser(user: User): void {
    this.$user.next(user);
    localStorage.setItem('user-name', user.username);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable(); // returns the user as an observable, basically where creating the user
  }

  // right here, when we refresh the page, it look at the local storage items, and if returns any value from them, it will do the same thing to set the value for the keys, so local storage si always updated and never loose the data from the user logged in
  getUser(): User | undefined { 
    const username = localStorage.getItem('user-name');
    const roles = localStorage.getItem('user-roles');

    if(username && roles) {
      const user: User = { username: username, roles: roles.split(',') }
      return user;
    }

    return undefined;
  }

  // at the logout functionality, i basically clear all the local storage and cookie data, so the user is automatically kicked of his account
  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }
}

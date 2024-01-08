import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  model: LoginRequest;
  constructor(private service: AuthService, 
    private cookieService: CookieService,
    private route: Router) {
    this.model = {
      username: '',
      password: ''
    }
  }

  onFormSubmit(): void {
    this.service.login(this.model).subscribe({
      next: (res) => {
        this.cookieService.set('Authorization', `Bearer ${res.token}`, undefined, '/', undefined, true, 'Strict'); // using the cookie service from the ngx package, it has the name i had given as a first param, and the token body
        this.service.setUser({username: res.username, roles: res.roles}) // setting user data to local storage

        this.route.navigate(['']);
      }
    })
  }
}

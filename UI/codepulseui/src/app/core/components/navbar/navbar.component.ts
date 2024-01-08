import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CategoriaComponent } from '../categoria/categoria.component';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/models/login-request';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, CategoriaComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  menuOpen = false;
  user?: User;
  constructor(private service: AuthService, private route: Router) {

  }
  ngOnInit(): void {
    this.service.user().subscribe({
      next: (res) => {
        this.user = res;
      }
    })

    this.user = this.service.getUser();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.service.logout();
    this.route.navigate(['']);
  }
}

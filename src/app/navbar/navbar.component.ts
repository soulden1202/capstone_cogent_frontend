import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginCred } from '../entities';
import { CommonModule } from '@angular/common';

import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { CartService } from '../cart.service';
import { MatBadgeModule } from '@angular/material/badge';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbarModule,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    RouterLink,
    MatMenuModule,
    MatBadgeModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private router: Router, private cart: CartService) {
    this.cart.currentSize.subscribe((size) => (this.size = size));
  }
  login: LoginCred | any;
  isLogin: boolean = false;
  isAdmin: boolean = false;

  size: number | undefined;

  ngOnInit() {
    // @ts-ignore
    this.login = JSON.parse(localStorage.getItem('login'));
    this.cart.currentSize.subscribe((size) => (this.size = size));
    if (this.login !== null) {
      this.isLogin = true;
      if (this.login.role[0].authority == 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
      console.log(this.isAdmin, this.login.role[0].authority == 'ROLE_ADMIN');
    }
  }

  onLogout() {
    localStorage.removeItem('login');
    localStorage.removeItem('cart');

    this.router.navigateByUrl('/home');
    window.location.reload();
  }

  onCart() {
    this.router.navigateByUrl('/cart');
  }

  homeNav() {
    this.router.navigateByUrl('/home');
  }

  onWishListClick() {
    this.router.navigateByUrl('/wishList');
  }

  onDashBoardClick() {
    this.router.navigateByUrl('/dashboard');
  }
}

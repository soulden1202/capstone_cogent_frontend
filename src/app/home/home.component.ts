import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { LoginCred, Product } from '../entities';
import { CommonModule, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../cart.service';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatGridListModule,
    NgFor,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private router: Router,
    private httpservice: HttpService,
    private cart: CartService
  ) {}
  defaultElevation = 2;
  raisedElevation = 8;
  products: Product[] = [];
  login: LoginCred | any;
  isLogin: boolean = false;
  isAdmin: boolean = false;

  ngOnInit() {
    // @ts-ignore
    this.login = JSON.parse(localStorage.getItem('login'));
    if (this.login !== null) {
      this.isLogin = true;
      if (this.login.role?.authority == 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    }
    this.httpservice.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      console.log(this.products);
    });
  }

  onCartClick(product: Product) {
    this.cart.addToCart(product);
  }

  onWishList(id: number) {
    this.httpservice
      .addProductToWishList(id, this.login.email, this.login.token)
      .subscribe(() => {
        console.log('ok');
      });
  }

  sorting(event: MatSelectChange) {
    //@ts-ignore
    let val = event.value;

    if (val == 'priceHigh') {
      this.products.sort((a, b) => b.price - a.price);
    } else if (val == 'priceLow') {
      this.products.sort((a, b) => a.price - b.price);
    } else if (val == 'alphaHigh') {
      this.products.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      this.products.sort((a, b) => a.name.localeCompare(b.name));
    }
  }
}

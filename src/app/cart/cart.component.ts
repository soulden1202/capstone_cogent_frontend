import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { LoginCred, Product, ProductCart } from '../entities';
import { CommonModule, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatGridListModule,
    NgFor,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  products: ProductCart[] = [];
  constructor(
    private router: Router,
    private httpservice: HttpService,
    private cart: CartService
  ) {}
  total = 0;

  coupon: string | any;

  ngOnInit() {
    // @ts-ignore
    this.products = JSON.parse(localStorage.getItem('cart'));

    console.log(this.products);

    if (this.products == null) {
      this.products = [];
    }

    if (this.products.length > 0) {
      for (let i = 0; i < this.products.length; i++) {
        this.total += this.products[i].price * this.products[i].quantity;
      }
    }
  }

  onPlus(p: ProductCart) {
    p.quantity += 1;
    this.cart.addToCart(p);
    this.total += p.price;
  }

  onMinus(p: ProductCart, i: number) {
    p.quantity -= 1;
    this.cart.removeFromCart(p);
    if (p.quantity == 0) {
      this.products.splice(i, 1);
    }
    this.total -= p.price;
  }

  onRemove(p: ProductCart, i: number) {
    this.products.splice(i, 1);
    console.log(this.products);
    this.total -= p.price * p.quantity;
    this.cart.remove(i);
  }

  onCheckout() {
    let products = [];
    // @ts-ignore
    var id = JSON.parse(localStorage.getItem('login')).id;
    // @ts-ignore
    var token = JSON.parse(localStorage.getItem('login')).token;

    for (let i = 0; i < this.products.length; i++) {
      var p = {
        userId: id,
        productId: this.products[i].id,
        quantity: this.products[i].quantity,
        price: this.products[i].price,
      };
      products.push(p);
    }

    console.log(products);

    this.httpservice
      .newOrder({ productPurchased: products, price: this.total }, token)
      .subscribe(() => console.log('ok'));

    this.products = [];
    localStorage.removeItem('cart');
    this.router.navigateByUrl('/home');
  }

  onApplyCoupon() {
    // @ts-ignore
    var token = JSON.parse(localStorage.getItem('login')).token;
    this.httpservice.getCoupon(token, this.coupon).subscribe((data: any) => {
      console.log(data);
      let red = this.total * (data.percent / 100);
      this.total = this.total - red;
    });
  }
}

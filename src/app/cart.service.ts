import { Injectable } from '@angular/core';
import { Product, ProductCart } from './entities';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  // @ts-ignore
  cart: ProductCart[] = JSON.parse(localStorage.getItem('cart')) | [];

  //keep track of the size of cart to display on navbar
  private sizeSource = new BehaviorSubject(
    this.cart?.length ? 0 : this.cart?.length
  );
  currentSize = this.sizeSource.asObservable();

  addToCart(product: Product) {
    //if emtpy create new array and add product to cart thenb save it to local storage

    if (!this.cart) {
      this.cart = [];
    }

    const indexToUpdate = this.cart.findIndex((c: any) => c.id === product.id);
    console.log(indexToUpdate);
    //check if product already in the cart if so increase the quantity
    if (indexToUpdate !== -1) {
      this.cart[indexToUpdate].quantity += 1;
    }
    //fif not add the product the the cart with quanity of 1
    else {
      let p = new ProductCart(
        product.id,
        product.name,
        product.description,
        product.price,
        product.imgUrl,
        1
      );
      this.cart.push(p);
    }

    localStorage.setItem('cart', JSON.stringify(this.cart));

    //update cart size
    this.sizeSource.next(this.cart?.length);
  }

  removeFromCart(product: Product) {
    // @ts-ignore
    this.cart = JSON.parse(localStorage.getItem('cart'));
    const indexToUpdate = this.cart.findIndex((c: any) => c.id === product.id);
    console.log(indexToUpdate);
    if (indexToUpdate !== -1) {
      this.cart[indexToUpdate].quantity -= 1;

      if (this.cart[indexToUpdate].quantity == 0) {
        this.cart.splice(indexToUpdate, 1);
      }
    }

    localStorage.setItem('cart', JSON.stringify(this.cart));
    //update cart size
    this.sizeSource.next(this.cart?.length);
  }

  remove(i: number) {
    // @ts-ignore
    this.cart = JSON.parse(localStorage.getItem('cart'));
    console.log(this.cart);
    this.cart.splice(i, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}

import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { Product } from '../entities';
import { NgFor, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [
    MatGridListModule,
    NgFor,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {
  constructor(private httpservice: HttpService) {}

  wishList: Product[] = [];

  ngOnInit() {
    // @ts-ignore
    const email = JSON.parse(localStorage.getItem('login')).email;
    // @ts-ignore
    const token = JSON.parse(localStorage.getItem('login')).token;
    this.httpservice.getWishList(email, token).subscribe((wishList) => {
      this.wishList = wishList;
      console.log('Abc');
    });
  }

  removeFromWishList(p: Product) {
    // @ts-ignore
    const email = JSON.parse(localStorage.getItem('login')).email;
    // @ts-ignore
    const token = JSON.parse(localStorage.getItem('login')).token;
    this.httpservice.removeFromWishList(email, p.id, token).subscribe(() => {
      console.log('ok');
    });
    window.location.reload();
  }
}

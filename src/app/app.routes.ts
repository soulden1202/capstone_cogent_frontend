import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { hasRoleGuard } from './has-role.guard';
import { Role } from './role';

import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [hasRoleGuard],
    data: {
      roles: [Role.USER],
    },
  },
  {
    path: 'wishList',
    component: WishlistComponent,
    canActivate: [hasRoleGuard],
    data: {
      roles: [Role.USER],
    },
  },

  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    canActivate: [hasRoleGuard],
    data: {
      roles: [Role.ADMIN],
    },
  },
  { path: '**', redirectTo: '/home' },

  //   {
  //     path: 'user/wishlist/:id',
  //     component: DetailComponent,
  //     canActivate: [hasRoleGuard],
  //     data: {
  //       roles: [Role.ADMIN],
  //     },
  //   },
];

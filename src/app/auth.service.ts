import { Injectable } from '@angular/core';
import { Role } from './role';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getUserRole(): Role {
    /**
     * fake an API call
     */
    // @ts-ignore
    var loginRole = JSON.parse(localStorage.getItem('login'))?.role[0]
      ?.authority;

    if (loginRole == 'ROLE_ADMIN') {
      return Role.ADMIN;
    } else if (loginRole == 'ROLE_USER') {
      return Role.USER;
    } else {
      return Role.NULL;
    }
  }
}

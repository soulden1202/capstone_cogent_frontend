import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginCred, Product, User } from './entities';
import { Observable } from 'rxjs';
import { Role } from './role';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `http://localhost:8080/product/getAllProducts`
    );
  }
  login(email: string, password: string): Observable<LoginCred> {
    return this.http.post<LoginCred>(`http://localhost:8080/auth/login`, {
      email: email,
      password: password,
    });
  }

  signup(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string
  ) {
    return this.http.post(`http://localhost:8080/auth/signup`, {
      email: email,
      password: password,
      fullName: firstName + ' ' + lastName,
      role: role,
    });
  }
  getWishList(email: string, token: string): Observable<Product[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // @ts-ignore
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Product[]>(`http://localhost:8080/users/getWishList`, {
      headers: headers,
      params: {
        email: email,
      },
    });
  }

  removeFromWishList(email: string, id: number, token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // @ts-ignore
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      `http://localhost:8080/users/removeFromWishList`,
      {
        userEmail: email,
        productId: id,
      },
      { headers }
    );
  }

  addProductToWishList(id: number, email: string, token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // @ts-ignore
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      `http://localhost:8080/users/addToWishList`,
      { userEmail: email, productId: id },
      {
        headers,
      }
    );
  }

  getAllUser(token: string): Observable<User[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<User[]>(`http://localhost:8080/users/getAllUsers`, {
      headers,
    });
  }

  upDateUser(
    token: string,
    email: string,
    fullName: string,
    role: string,
    password: string,
    id: number
  ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      'http://localhost:8080/users/updateUser',
      {
        id: id,
        fullName: fullName,
        email: email,
        password: password,
        role: role,
      },
      {
        headers,
      }
    );
  }

  newOrder(obj: any, token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      'http://localhost:8080/users/newOrder',

      obj,

      {
        headers,
      }
    );
  }

  changeUserActiveStatus(token: string, id: number, active: boolean) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      'http://localhost:8080/users/changeActiveStatus',
      {
        id: id,
        active: active,
      },
      {
        headers,
      }
    );
  }

  upDateProduct(token: string, formData: FormData) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      'http://localhost:8080/product/updateProduct',

      formData,

      {
        headers,
      }
    );
  }

  createProduct(token: string, formData: FormData) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      'http://localhost:8080/product/create',

      formData,

      {
        headers,
      }
    );
  }

  createProductBulk(token: string, data: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      'http://localhost:8080/product/createBulk',

      data,

      {
        headers,
      }
    );
  }

  deleteProduct(id: number, token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(
      `http://localhost:8080/product/deleteProduct/${id}`,

      {
        headers,
      }
    );
  }

  getAllCoupon(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(
      'http://localhost:8080/coupon/getAllCoupon',

      {
        headers,
      }
    );
  }

  createCoupon(token: string, data: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      'http://localhost:8080/coupon/createCoupon',

      data,

      {
        headers,
      }
    );
  }

  getCouponById(token: string, id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(
      `http://localhost:8080/coupon/getCoupon/${id}`,

      {
        headers,
      }
    );
  }

  deleteCouponById(token: string, id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(
      `http://localhost:8080/coupon/deleteCoupon/${id}`,

      {
        headers,
      }
    );
  }

  getSaleReport(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(
      `http://localhost:8080/product/getReport`,

      {
        headers,
      }
    );
  }

  getCoupon(token: string, coupon: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(
      `http://localhost:8080/coupon/getCouponByCode/${coupon}`,

      {
        headers,
      }
    );
  }
}

export class LoginCred {
  constructor(
    public token: string,
    public email: string,
    public role: [],
    public expiresIn: string
  ) {}
}

export class Product {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public imgUrl: string
  ) {}
}

export class ProductCart {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public imgUrl: string,
    public quantity: number
  ) {}
}

export class User {
  constructor(
    public id: number,
    public email: string,
    public role: [],
    public fullName: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}

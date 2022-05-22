import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  CART_URL = 'http://localhost:3000/cart';
  PRODUCT_URL: string = 'http://localhost:3000/product';
  SEASON_URL = 'http://localhost:3000/season';
  USER_URL = 'http://localhost:3000/user';

  page: number = 0;

  ARRAY_PRODUCT_URL: string[] = [];
  PRODUCT_URL_LIMIT_BEGIN: string = 'http://localhost:3000/product?_page=';
  PRODUCT_URL_LIMIT_END: string = '&_limit=12';

  setLink() {
    let page_number = 0;
    let round_number = 0;
    this.http.get(this.PRODUCT_URL).subscribe((res) => {
      this.productList = res;

      page_number = this.productList.length / 10;

      // Rounding number
      round_number = page_number * 10;
      round_number %= 10;
      if (round_number != 0) {
        page_number = page_number - round_number / 10 + 1;
      }

      this.page = page_number;

      for (let i = 1; i <= page_number; i++) {
        let page_url =
          this.PRODUCT_URL_LIMIT_BEGIN + i + this.PRODUCT_URL_LIMIT_END;
        this.ARRAY_PRODUCT_URL.push(page_url);
      }
    });
  }

  constructor(private http: HttpClient) {}

  amount: number = 0;
  price: number = 0;
  cartList: any = [];
  productList: any = [];

  //Cart
  getCart(): Observable<any> {
    return this.http.get(this.CART_URL);
  }

  findIdCart(id: any): Observable<any> {
    return this.http.get(this.CART_URL + '/' + id);
  }

  addCart(cart: any): Observable<any> {
    return this.http.post(this.CART_URL, cart);
  }

  updateCart(id: any, cart: any): Observable<any> {
    return this.http.put(`${this.CART_URL}/${id}`, cart);
  }

  removeCart(id: any): Observable<any> {
    return this.http.delete(this.CART_URL + '/' + id);
  }

  // Start Product service
  getProduct(): Observable<any> {
    return this.http.get(this.PRODUCT_URL);
  }

  findIdProduct(id: any): Observable<any> {
    return this.http.get(this.PRODUCT_URL + '/' + id);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(this.PRODUCT_URL, product);
  }

  updateProduct(id: any, product: any): Observable<any> {
    return this.http.put(`${this.PRODUCT_URL}/${id}`, product);
  }

  removeProduct(id: any): Observable<any> {
    return this.http.delete(this.PRODUCT_URL + '/' + id);
  }
  // End Product service

  // Season
  getSeason(): Observable<any> {
    return this.http.get(this.SEASON_URL);
  }

  findIdSeason(id: any): Observable<any> {
    return this.http.get(this.SEASON_URL + '/' + id);
  }

  addSeason(user: any): Observable<any> {
    return this.http.post(this.SEASON_URL, user);
  }

  updateSeason(id: any, user: any): Observable<any> {
    return this.http.put(`${this.SEASON_URL}/${id}`, user);
  }

  removeSeason(id: any): Observable<any> {
    return this.http.delete(this.SEASON_URL + '/' + id);
  }

  // User
  getUser(): Observable<any> {
    return this.http.get(this.USER_URL);
  }

  findIdUser(id: any): Observable<any> {
    return this.http.get(this.USER_URL + '/' + id);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.USER_URL, user);
  }

  updateUser(id: any, user: any): Observable<any> {
    return this.http.put(`${this.USER_URL}/${id}`, user);
  }

  removeUser(id: any): Observable<any> {
    return this.http.delete(this.USER_URL + '/' + id);
  }

  getCartList() {
    console.log('Get Cart List Call' + this.cartList);

    return this.cartList;
  }

  updateCartList() {
    this.http.get(this.CART_URL).subscribe((res) => {
      this.cartList = res;

      console.log('Update Cart List Call' + this.cartList);
    });
  }

  updateCartNumber() {
    this.http.get(this.CART_URL).subscribe((res) => {
      this.cartList = res;
      this.amount = this.cartList.length;
    });
  }

  updateCartPrice() {
    this.http.get(this.CART_URL).subscribe((res) => {
      this.cartList = res;
      this.price = this.cartList.reduce(
        (accumulator: any, cart: any) => accumulator + cart.product.price,
        0
      );
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Injectable, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService implements AfterViewInit{
  CART_URL = 'http://localhost:3000/cart';

  price: number = 0;
  cartList: any = [];
  numberElement: number = 0;
  checkEmpty: boolean = true;

  buttonAdd: Subject<any> = new Subject();
  buttonObservable = this.buttonAdd.asObservable();

  constructor(private http: HttpClient) {}
  ngAfterViewInit(): void {
    this.updateNumberAndPrice()
  }

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

  updateNumberAndPrice() {
    this.http.get(this.CART_URL).subscribe((res) => {
      this.cartList = res;
      this.numberElement = this.cartList.length;
      this.price = this.cartList.reduce(
        (accumulator: number, heart: any) => accumulator + heart.product.price,
        0
      );

      // Check list product in heart empty
        if(this.numberElement > 0) {
          this.checkEmpty = true;
        } else {
          this.checkEmpty = false;
        }
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  PRODUCT_URL: string = 'http://localhost:3000/product';

  constructor(private http: HttpClient) { }

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
}

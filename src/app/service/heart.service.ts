import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeartService {
  HEART_URL: string = 'http://localhost:3000/heart';
  constructor(private http: HttpClient) {}

  numberElement: number = 0;
  price: number = 0;
  heartList: any = [];
  checkEmpty:boolean = false;

  buttonAdd: Subject<any> = new Subject();
  buttonObservable = this.buttonAdd.asObservable();

  getHeartList(): Observable<any> {
    return this.http.get(this.HEART_URL);
  }

  addHeart(heart: any): Observable<any> {
    return this.http.post(this.HEART_URL, heart);
  }

  updateNumberAndPrice() {
    this.http.get(this.HEART_URL).subscribe((res) => {
      this.heartList = res;
      this.numberElement = this.heartList.length;
      this.price = this.heartList.reduce(
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

  remove(id: number) {
    return this.http.delete(this.HEART_URL + '/' + id);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  USER_URL = 'http://localhost:3000/user';

  constructor(private http:HttpClient) { }

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

}

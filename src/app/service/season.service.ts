import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  SEASON_URL = 'http://localhost:3000/season';
  constructor(private http: HttpClient) { }

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

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class searchService {
  private URL = 'http://localhost:8088/FLIGHTSERVICE/api/flight/search';
  private URL1 = 'http://localhost:8088/FLIGHTSERVICE/api/airports';
  private airports: any[] = [];
  constructor(private http: HttpClient) { }

  searchFlights(payload: any): Observable<any> {
    return this.http.post(this.URL, payload);
  }
  getAirports(): Observable<any> {
    if (this.airports.length == 0) {
      return this.http.get<any[]>(this.URL1).pipe(
        tap(data => this.airports = data)
      );
    }
    else {
      return of(this.airports);
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class searchService {
  private URL='http://localhost:8088/FLIGHTSERVICE/api/flight/search';
  constructor(private http: HttpClient) {}

  searchFlights(payload: any): Observable<any> {
  return this.http.post(this.URL, payload); 
}
}

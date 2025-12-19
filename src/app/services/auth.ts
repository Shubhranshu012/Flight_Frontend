import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth{

  private URL = 'http://localhost:8088/AUTHSERVICE/auth';
  private URL2 = 'http://localhost:8088/BOOKINGSERVICE/api/flight/booking';
  private URL3='http://localhost:8088/BOOKINGSERVICE/api/flight/booking/cancel'

  constructor(private http: HttpClient) {}

  register(payload: {username: string,password: string,role: string}): Observable<any> {
    return this.http.post(`${this.URL}/register`, payload);
  }

  login(payload:{username: string,password: string}): Observable<any>{
    return this.http.post(`${this.URL}/login`, payload);
  }
  booking(payload:any,flightId:string): Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    console.log("Here");
    return this.http.post(`${this.URL2}/${flightId}`,payload,{headers});
  }
  cancel(email: any, pnr: any): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    return this.http.post(`${this.URL3}/${pnr}`,{ email },{ headers });
  }
}

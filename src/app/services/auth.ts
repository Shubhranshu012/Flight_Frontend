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
  private URL4='http://localhost:8088/BOOKINGSERVICE/api/flight/booking/history';
  constructor(private http: HttpClient) {}

  register(payload: {username: string,password: string,role: string}): Observable<any> {
    return this.http.post(`${this.URL}/register`, payload);
  }

  login(payload:{email: string,password: string}): Observable<any>{
    return this.http.post(`${this.URL}/login`, payload);
  }
  booking(payload:any,flightId:string): Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    console.log("Here");
    return this.http.post(`${this.URL2}/${flightId}`,payload,{headers});
  }
  cancel(pnr: any): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    return this.http.delete(`${this.URL3}/${pnr}`,{ headers});
  }
  getAll(email:any){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    return this.http.get(`${this.URL4}/${email}`,{headers});
  }
  change(payload:any){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    return this.http.post(`${this.URL}/change`,payload,{headers});
  }
}

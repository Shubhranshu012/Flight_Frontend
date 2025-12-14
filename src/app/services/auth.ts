import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth{

  private URL = 'http://localhost:8088/AUTHSERVICE/auth';

  constructor(private http: HttpClient) {}

  register(payload: {username: string,password: string,role: string}): Observable<any> {
    return this.http.post(`${this.URL}/register`, payload);
  }
}

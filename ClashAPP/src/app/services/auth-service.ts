import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  private baseUrl = "http://localhost:3000/api/usuarios";

  login(username: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/login`,{ username, password })
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`,{ username, password });
  }
}

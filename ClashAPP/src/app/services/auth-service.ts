import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  private loggedIn$ = new BehaviorSubject<boolean>(false); // se crea con valor inicial false
  public isLoggedIn$ = this.loggedIn$.asObservable(); // el $ significa que es un observable

  private baseUrl = "http://localhost:3000/api/usuarios";

  login(username: string, password: string) {
    this.loggedIn$.next(true);
    return this.http.post<any>(`${this.baseUrl}/login`,{ username, password })
  }

  logout() {
    this.loggedIn$.next(false);
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`,{ username, password });
  }
}

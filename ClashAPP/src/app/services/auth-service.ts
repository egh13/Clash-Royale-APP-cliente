import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private readonly BASE_URL = 'http://localhost:3000/api/usuarios';
  private readonly TOKEN_KEY = 'auth_token';

  private loggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedIn$.asObservable();

  private http = inject(HttpClient);

  login(username: string, password: string) {
    return this.http.post<{ token: string, user: {id: number, username: string, role: string} }>(
      `${this.BASE_URL}/login`,
      { username, password }
    ).pipe(
      tap(response => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        this.loggedIn$.next(true);
      }),
      catchError((err) => {
        // Si el backend devuelve { error: "..." }
        const errorMessage = err.error?.error || 'Error en la autenticación';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.loggedIn$.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  register(username: string, password: string, email?: string, birthDate?: string, userType?: string, newsletter?: boolean): Observable<{ id: number }>{
    return this.http.post<{ id: number}>(
      `${this.BASE_URL}/register`,
      { username, password, email, birthDate, userType, newsletter }
    );
  }

}

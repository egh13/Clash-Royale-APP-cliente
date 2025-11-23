import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000';

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/usuarios/login`, { username, password }); //obtener token de sesion
  }

  logout(): void {
    localStorage.removeItem('authToken'); // Eliminar el token del localStorage
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken'); // Verificar si el token está presente en localStorage
  }
}

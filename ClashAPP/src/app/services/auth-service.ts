import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(usuario: string, password: string) {
    return (
      this.http
        .post<any>('http://localhost:3000/api/usuarios/login', { usuario, password })
        //.shareReplay() //almacena en cache la respuesta del observable, evita que se pueda mandar varias veces el POST
    );
  }
}

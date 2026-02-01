import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private http = inject(HttpClient);

  // user info desde la API clash royale
  getUserInfo(userId: string | null) {
    return this.http.get<any>('http://localhost:3000/api/developerApi/players/' + userId);
  }
}

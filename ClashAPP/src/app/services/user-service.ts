import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserInfo(userId: string | null) {
    return this.http.get<any>('http://localhost:3000/api/developerApi/players/' + userId);
  }
}

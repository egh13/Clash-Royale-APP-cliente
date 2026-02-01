import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);

  private BASE_URL = 'http://localhost:3000/api/usuarios';

  changePassword(password: string) {
    const token = this.auth.getToken();
    return this.http.put(
      `${this.BASE_URL}/change-password`,
      { newPassword: password },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  deleteUser() {
    const token = this.auth.getToken();
    return this.http.delete(`${this.BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}

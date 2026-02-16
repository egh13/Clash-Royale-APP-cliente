import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);

  private BASE_URL = 'http://localhost:3000/api/usuarios';

  changePassword(password: string) {
    return this.http.put(
      `${this.BASE_URL}/change-password`,
      { newPassword: password }
    );
  }

  deleteUser() {
    return this.http.delete(`${this.BASE_URL}/me`);
  }

  setClashRoyaleId(id: string) {
    return this.http.post(
      `${this.BASE_URL}/setClashRoyaleId`,
      { clashRoyaleId: id },
    );
  }
  
}

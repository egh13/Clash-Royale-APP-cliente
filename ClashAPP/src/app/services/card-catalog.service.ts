import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardCatalogService {

  private apiUrl = 'http://localhost:3000/api/developerApi/cards';

  constructor(private http: HttpClient) {}

  getAllCards(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}

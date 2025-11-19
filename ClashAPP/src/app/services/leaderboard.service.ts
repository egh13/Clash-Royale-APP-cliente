import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/api/clans/rankings/'; // API endpoint

  obtenerLeaderboard(countryCode:string): Observable<any> {
    return this.http.get(this.apiUrl + countryCode);
  }
}

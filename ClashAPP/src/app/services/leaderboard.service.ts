import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {

  constructor(private http: HttpClient) {}

  private apiUrl = "";

  obtenerLeaderboard(){
    return this.http.get(this.apiUrl);
  }
}

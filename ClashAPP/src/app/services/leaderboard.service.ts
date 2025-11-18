import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {

  constructor(private http: HttpClient) {}

  //cambiar porque no es seguro hardcodear la API_KEY
  private API_KEY =
    '';
  private apiUrl = 'https://proxy.royaleapi.dev/v1/locations/global/seasons';

  obtenerLeaderboard(){
    return this.http.get(this.apiUrl, {headers: {'Authorization': 'Bearer ' + this.API_KEY}});
  }
}

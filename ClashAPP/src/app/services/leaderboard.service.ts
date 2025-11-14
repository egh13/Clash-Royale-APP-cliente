import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {

  //cambiar porque no es seguro hardcodear la API_KEY
  private API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjM3MWI0YjdlLTBiZjMtNDUyNy04ZWQ5LTI2NzY3OTZiNjgwMCIsImlhdCI6MTc2Mjk0NDQzMywic3ViIjoiZGV2ZWxvcGVyLzhjMGZmZTg2LWQ4NjUtYTBiMy03ZTU1LTgxYjc5N2E0NjA4NiIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI0NS43OS4yMTguNzkiXSwidHlwZSI6ImNsaWVudCJ9XX0.5Qrn_w-dqoXb5c2ypesKyChGnloUZIZqVtQKt593W-oELGX29ObFRuiE4t5npZw0Xr-360XSM7NzWBujeoMNyA'
  private apiUrl = 'https://proxy.royaleapi.dev/v1/locations/global/seasons';

  constructor(private http: HttpClient) {} 

  obtenerDatos(){
    return "hola";
  }
}

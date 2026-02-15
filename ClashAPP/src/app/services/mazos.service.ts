import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Mazo, CreateMazoRequest, UpdateMazoRequest, ApiResponse } from '../interfaces/mazo.interface';

@Injectable({
  providedIn: 'root'
})
export class MazosService {
  private readonly API_URL = 'http://localhost:3000/api/mazos';
  private http = inject(HttpClient);
  
  // BehaviorSubject para mantener estado de mazos en tiempo real
  private mazosSubject = new BehaviorSubject<Mazo[]>([]);
  public mazos$ = this.mazosSubject.asObservable();
  
  // Loading state
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor() {
    this.loadMazos();
  }

  /**
   * Obtener todos los mazos del usuario autenticado
   */
  getMazos(): Observable<Mazo[]> {
    this.setLoading(true);
    
    return this.http.get<ApiResponse<Mazo[]>>(this.API_URL).pipe(
      map(response => {
        if (response.success && response.data) {
          return response.data;
        }
        throw new Error(response.message || 'Error al obtener mazos');
      }),
      tap(mazos => {
        this.mazosSubject.next(mazos);
        this.setLoading(false);
      }),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Crear un nuevo mazo
   */
  createMazo(mazoData: CreateMazoRequest): Observable<Mazo> {
    this.setLoading(true);
    
    return this.http.post<ApiResponse<Mazo>>(this.API_URL, mazoData).pipe(
      map(response => {
        if (response.success && response.data) {
          return response.data;
        }
        throw new Error(response.message || 'Error al crear mazo');
      }),
      tap(nuevoMazo => {
        // Actualizar lista local
        const currentMazos = this.mazosSubject.value;
        this.mazosSubject.next([...currentMazos, nuevoMazo]);
        this.setLoading(false);
      }),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Actualizar un mazo existente
   */
  updateMazo(id: string, mazoData: UpdateMazoRequest): Observable<Mazo> {
    this.setLoading(true);
    
    return this.http.put<ApiResponse<Mazo>>(`${this.API_URL}/${id}`, mazoData).pipe(
      map(response => {
        if (response.success && response.data) {
          return response.data;
        }
        throw new Error(response.message || 'Error al actualizar mazo');
      }),
      tap(mazoActualizado => {
        // Actualizar lista local
        const currentMazos = this.mazosSubject.value;
        const index = currentMazos.findIndex(m => m.id === id);
        if (index > -1) {
          currentMazos[index] = mazoActualizado;
          this.mazosSubject.next([...currentMazos]);
        }
        this.setLoading(false);
      }),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Eliminar un mazo
   */
  deleteMazo(id: string): Observable<void> {
    this.setLoading(true);
    
    return this.http.delete<ApiResponse<void>>(`${this.API_URL}/${id}`).pipe(
      map(response => {
        if (response.success) {
          return;
        }
        throw new Error(response.message || 'Error al eliminar mazo');
      }),
      tap(() => {
        // Actualizar lista local
        const currentMazos = this.mazosSubject.value.filter(m => m.id !== id);
        this.mazosSubject.next(currentMazos);
        this.setLoading(false);
      }),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Obtener un mazo específico por ID
   */
  getMazoById(id: string): Observable<Mazo> {
    return this.http.get<ApiResponse<Mazo>>(`${this.API_URL}/${id}`).pipe(
      map(response => {
        if (response.success && response.data) {
          return response.data;
        }
        throw new Error(response.message || 'Mazo no encontrado');
      }),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Cargar mazos inicial (llamado en constructor)
   */
  private loadMazos(): void {
    this.getMazos().subscribe({
      next: () => {}, // Los mazos ya se actualizaron en el tap
      error: (error) => {
        console.error('Error cargando mazos:', error);
        this.setLoading(false);
      }
    });
  }

  /**
   * Manejar errores HTTP
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    this.setLoading(false);
    
    let errorMessage = 'Ha ocurrido un error inesperado';
    
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      switch (error.status) {
        case 400:
          errorMessage = error.error?.message || 'Datos inválidos';
          break;
        case 401:
          errorMessage = 'No autorizado. Por favor inicia sesión nuevamente';
          break;
        case 403:
          errorMessage = 'No tienes permisos para realizar esta acción';
          break;
        case 404:
          errorMessage = 'Recurso no encontrado';
          break;
        case 409:
          errorMessage = error.error?.message || 'Conflicto en los datos';
          break;
        case 500:
          errorMessage = 'Error interno del servidor';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.error?.message || error.message}`;
      }
    }

    console.error('Error en MazosService:', error);
    return throwError(() => new Error(errorMessage));
  }

  /**
   * Actualizar estado de carga
   */
  private setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  /**
   * Obtener estado actual de mazos sin observable
   */
  getCurrentMazos(): Mazo[] {
    return this.mazosSubject.value;
  }

  /**
   * Limpiar estado (útil para logout)
   */
  clearMazos(): void {
    this.mazosSubject.next([]);
  }
}

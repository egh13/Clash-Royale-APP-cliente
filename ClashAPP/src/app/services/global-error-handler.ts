import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler{

  handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      // Errores HTTP
      switch (error.status) {
      case 0:
        console.error('No se pudo conectar con el servidor', error.message);
        break;
      case 401:
        console.warn('No autorizado');
        break;
      case 404:
        console.warn('Recurso no encontrado');
        break;
      case 500:
        console.error('Error de servidor', error.message);
        break;
      default:
        console.error('Error HTTP desconocido', error.status, error.message);
    }
    } else {
        console.error('Error de aplicación:', error);
    }
  }
  
}

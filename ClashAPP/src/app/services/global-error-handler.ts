import { ErrorHandler, inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from './toast-service';

@Injectable({
  providedIn: 'root',
})

// utlizado en caso de que no se maneje el error de otra forma

export class GlobalErrorHandler implements ErrorHandler{

private toastService = inject(ToastService);

handleError(error: any): void {
  if (error instanceof HttpErrorResponse) {
    switch (error.status) {
      case 0:
        this.toastService.error(
          'No se pudo conectar con el servidor. Verifica tu conexión.'
        );
        break;

      case 401:
        this.toastService.info(
          'Tu sesión ha expirado. Por favor inicia sesión nuevamente.'
        );
        break;

      case 404:
        this.toastService.info(
          'El recurso solicitado no fue encontrado.'
        );
        break;

      case 500:
        this.toastService.error(
          'Ocurrió un error en el servidor. Intenta más tarde.'
        );
        break;

      default:
        this.toastService.error(
          `Error inesperado (${error.status}). Intenta nuevamente.`
        );
        break;
    }
  } else {
    this.toastService.error(
      'Ocurrió un error inesperado en la aplicación.'
    );
  }
}
}

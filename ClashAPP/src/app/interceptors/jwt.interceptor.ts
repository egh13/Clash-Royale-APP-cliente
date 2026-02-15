import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // Obtener token desde AuthService
  const token = authService.getToken();
  
  // Clonar request y añadir Authorization header si hay token
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  // Manejar response y errores
  return next(req).pipe(
    catchError(error => {
      // Si token expirado o no autorizado, logout y redirect
      if (error.status === 401 || error.status === 403) {
        authService.logout();
        router.navigate(['/login']);
      }
      
      return throwError(() => error);
    })
  );
};
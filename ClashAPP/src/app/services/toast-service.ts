import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastMessage {
  text: string;
  type: 'success' | 'error' | 'info';

}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  // Observable para emitir mensajes
  toastState = new Subject<ToastMessage>();

  private show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.toastState.next({ text: message, type });
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  info(message: string) {
    this.show(message, 'info');
  }
}

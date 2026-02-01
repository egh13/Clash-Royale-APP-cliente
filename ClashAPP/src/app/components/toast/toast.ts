import { Component, OnInit } from '@angular/core';
import { ToastService, ToastMessage } from '../../services/toast-service';


@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class ToastComponent implements OnInit {
  messages: ToastMessage[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toastState.subscribe((msg: ToastMessage) => {

      this.messages.push(msg);

      // Eliminar automáticamente después de 3 segundos
      setTimeout(() => {
        this.removeMessage(msg);
      }, 3000);
    });
  }

  removeMessage(msg: ToastMessage) {
    this.messages = this.messages.filter(m => m !== msg);
  }
  
}
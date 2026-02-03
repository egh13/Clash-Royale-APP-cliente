import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-contacto',
  imports: [ReactiveFormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {

  private fb = inject(FormBuilder);
  private toast = inject(ToastService);

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern(/^[0-9]{9}$/)]],

    subject: ['', Validators.required],

    priority: ['normal', Validators.required],

    interests: this.fb.group({
      gaming: [false],
      desarrollo: [false],
      networking: [false],
    }),


    message: ['', [Validators.required, Validators.minLength(10)]],

    acceptTerms: [false, Validators.requiredTrue],
  });

  submit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    // toast informativo 
    this.toast.success("Formulario Enviado Correctamente");

    // Reset opcional
    this.contactForm.reset({
      priority: 'normal',
      interests: this.fb.group({
        gaming: [false],
        desarrollo: [false],
        networking: [false],
      }),

    });
  }
}

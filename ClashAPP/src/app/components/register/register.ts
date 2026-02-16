import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast-service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-register',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {

  registerForm: FormGroup;

  private router = inject(Router);
  private authService = inject(AuthService);
  private toast = inject(ToastService);

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],

      email: ['', [Validators.required, Validators.email]],

      birthDate: ['', Validators.required],

      userType: ['', Validators.required], // desplegable

      password: ['', [Validators.required, Validators.minLength(4)]],

      newsletter: [false], // checkbox
    });
  }

  submit() {
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    this.toast.error('Por favor completa todos los campos correctamente');
    return;
  }

  // register con todos los datos del formulario
  const { username, password, email, birthDate, userType, newsletter } = this.registerForm.value;

  this.authService.register(username, password, email, birthDate, userType, newsletter).subscribe({
    next: (res) => {
      this.toast.success(`Usuario registrado con ID: ${res.id}`);
      this.router.navigate(['/']);
    },
    error: (err) => {
      this.toast.error(err.error?.error || 'Error al registrar usuario');
    }
  });

}
}

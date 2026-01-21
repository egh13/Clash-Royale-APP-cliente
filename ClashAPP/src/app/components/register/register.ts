import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup;
  message: string = '';

  private router = inject(Router);
  private authService = inject(AuthService);
  
  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
  
  submit() {
    if (this.registerForm.invalid) {
      this.message = 'Por favor completa todos los campos correctamente';
      return;
    }
    
    const { username, password } = this.registerForm.value;

    this.authService.register(username, password).subscribe({
      next: (res) => {
        this.message = `Usuario registrado con ID: ${res.id}`;
        this.registerForm.reset();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.message = err.error?.error || 'Error al registrar usuario';
      }
    });
  }
}

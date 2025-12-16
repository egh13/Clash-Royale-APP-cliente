import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
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

    this.authService.register(username, password).subscribe(
      res => {
        this.message = `Usuario registrado con ID: ${res.id}`;
        this.registerForm.reset();
      },
      err => {
        this.message = err.error?.error || 'Error al registrar usuario';
      }
    );
  }
}

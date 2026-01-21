import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  errorMessage: string = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    passwd: new FormControl('', Validators.required),
  });

  onLogin() {
    const values = this.loginForm.value;

    if (values.usuario && values.passwd) {
      this.authService.login(values.usuario, values.passwd).subscribe({
        next: (response) => {
          if (response) {
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          this.errorMessage = error.message;
        }
      });
    }
  }
}

import { Component } from '@angular/core';
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

  constructor(private authService: AuthService, private router: Router) {}

  loginForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    passwd: new FormControl('', Validators.required),
  });

  onLogin() {
    const values = this.loginForm.value;

    if (values.usuario && values.passwd) {
      this.authService.login(values.usuario, values.passwd).subscribe(
        (response) => {
          if (response.token) {
            // Guardar el token en localStorage
            localStorage.setItem('authToken', response.token);
            this.router.navigate(['/']);
          }
        },
        (error) => {
          console.error('Error de autenticación', error); // TODO majear correctamente
        }
      );
    } else {
      console.log('error'); // TODO manejar correctamente
    }
  }
}

import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

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
            console.log(response);
            this.toast.success("Bienvenido \"" + response.user["username"] + "\"");
          }
        },
        error: (error) => {
          this.toast.info("Ocurrio un error");
        }
      });
    }
  }
}

import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private authService: AuthService) {}

  loginForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    passwd: new FormControl('', Validators.required),
  });

  login() {
    const values = this.loginForm.value;

    if (values.usuario && values.passwd) {
      this.authService.login(values.usuario, values.passwd).subscribe(() => {
        console.log('User is logged in');
        //this.router.navigateByUrl('/');
      });
    }
  }
}

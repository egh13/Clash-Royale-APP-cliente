import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  id: number;
  username: string;
  role: string;
}

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})

export class Profile implements OnInit {

  private authService = inject(AuthService);
  private router = inject(Router);

  user!: JwtPayload;

  ngOnInit(): void {
    const token = this.authService.getToken();

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.user = jwtDecode<JwtPayload>(token);
  }

  deleteUser() {

    // TODO aquí iría la llamada al backend
    const confirmDelete = confirm('¿Seguro que deseas borrar tu cuenta?');

    if (confirmDelete) {
      console.log('Usuario eliminado:', this.user.id);
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  changePassword() {

    // TODO
    console.log('Cambiar contraseña para:', this.user.username);
    this.router.navigate(['/change-password']);
  }
}
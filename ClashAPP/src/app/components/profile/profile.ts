import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ProfileService } from '../../services/profile-service';
import { ToastService } from '../../services/toast-service';
import { FormsModule } from '@angular/forms';
import { User } from '../user/user';

type JwtPayload = {
  id: number;
  username: string;
  role: string;
}

@Component({
  selector: 'app-profile',
  imports: [FormsModule, User],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})

export class Profile implements OnInit {

  private authService = inject(AuthService);
  private router = inject(Router);
  private profileService = inject(ProfileService);
  private toastService = inject(ToastService);

  user!: JwtPayload;

  newPassword: string = '';
  newId: string = '';
  clashRoyaleId: string = '';

  ngOnInit(): void {
    // redirigir si no hay token
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    this.user = jwtDecode<JwtPayload>(token);

    // cargar clashRoyaleId real desde la base de datos
    this.profileService.getProfile().subscribe({
      next: (res: any) => {
        this.clashRoyaleId = res.clashRoyaleId || '';
      },
      error: () => {
        this.clashRoyaleId = '';
      }
    });
  }
  
  changePassword(): void {
    if (!this.newPassword.trim()) {
      this.toastService.error('La contraseña no puede estar vacía');
      return;
    }

    this.profileService.changePassword(this.newPassword).subscribe({
      next: (res: any) => {
        this.toastService.success(res.message);
        this.newPassword = ''; // limpiar input
      },
      error: (err) => this.toastService.error(err.error?.error || 'Error al cambiar contraseña'),
    });
  }

  deleteUser(): void {
    if (!confirm('¿Seguro que deseas borrar tu cuenta?')) return;

    this.profileService.deleteUser().subscribe({
      next: (res: any) => {
        this.toastService.success(res.message);
        this.authService.logout();
        this.router.navigate(['/login']);
      },
      error: (err) => this.toastService.error(err.error?.error || 'Error al borrar usuario'),
    });
  }

  setClashRoyaleId(): void {
    if (!this.newId.trim()) {
      this.toastService.error('El id no puede estar vacio');
      return;
    }else if(this.newId.length !== 9) {
      this.toastService.error('El id debe tener 9 dígitos');
      return;
    }

    this.profileService.setClashRoyaleId(this.newId).subscribe({
      next: (res: any) => {
        this.toastService.success(res.message);
        this.clashRoyaleId = this.newId;
      },
      error: (err) => this.toastService.error(err.error?.error || 'Error al establecer id'),
    });
  }
}
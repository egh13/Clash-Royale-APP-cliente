import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})

export class Profile implements OnInit {

  private authService = inject(AuthService);
  private token: string | null = '';

  ngOnInit(): void {
    this.token = this.authService.getToken();
  }
}

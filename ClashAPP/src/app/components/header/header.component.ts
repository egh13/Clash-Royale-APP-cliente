import { Component, inject } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent {

  auth = inject(AuthService);

  isLoggedIn$ = this.auth.isLoggedIn$;

  router = inject(Router);

  buscarUsuario(tag: string) {
    if (tag && tag.trim() !== '') {
      // Redirige a la página /user/:tag
      this.router.navigate(['/user', tag.trim()]);
    }
  }

  onLogout(){
    this.auth.logout();
    this.router.navigate(['/']);
  }

}

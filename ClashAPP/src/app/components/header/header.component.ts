import { Component, inject } from '@angular/core';
import { Router, RouterLink} from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  router = inject(Router);

  buscarUsuario(tag: string) {
    if (tag && tag.trim() !== '') {
      // Redirige a la página /user/:tag
      this.router.navigate(['/user', tag.trim()]);
    }
  }
}

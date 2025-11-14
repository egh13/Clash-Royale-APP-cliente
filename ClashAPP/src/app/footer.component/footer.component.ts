import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})

export class FooterComponent {
  logo: string = 'logo.jpg'; // solo el nombre de la imagen, igual que carousel
}


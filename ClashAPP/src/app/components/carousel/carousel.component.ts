import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  images: string[] = ['slider1.jpg', 'slider2.jpg'];

  currentIndex: number = 0;
  intervalId: any;

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Limpiar el intervalo al destruir el componente
    }
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 3000); // Cambiar cada 3 segundos (3000 ms)
  }

  previousImage() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.images.length - 1;
    }
  }
  nextImage() {
    this.currentIndex++;
    if (this.currentIndex >= this.images.length) {
      this.currentIndex = 0;
    }
  }
}

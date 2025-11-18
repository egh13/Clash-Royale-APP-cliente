import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel.component/carousel.component';
import { LeaderboardComponent } from '../leaderboard.component/leaderboard.component';


@Component({
  selector: 'app-index.component',
  imports: [CarouselComponent, LeaderboardComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {
  
}

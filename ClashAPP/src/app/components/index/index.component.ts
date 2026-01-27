import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';

@Component({
  selector: 'app-index',
  imports: [CarouselComponent, LeaderboardComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {

}

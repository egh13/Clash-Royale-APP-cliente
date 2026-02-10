import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-index',
  imports: [CarouselComponent, LeaderboardComponent, MatButtonModule, MatCardModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {

}

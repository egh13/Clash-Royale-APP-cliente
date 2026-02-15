import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [CarouselComponent, LeaderboardComponent, MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {

}

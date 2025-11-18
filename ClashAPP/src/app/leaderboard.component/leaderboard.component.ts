import { Component, inject} from '@angular/core';
import { LeaderboardService } from '../services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  imports: [],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css',
})
export class LeaderboardComponent {
  constructor(private leaderboardService: LeaderboardService) {};

  llamarApi(){
    this.leaderboardService.obtenerLeaderboard().subscribe(leaderData=>{
      console.log(leaderData);
    })
  }
}


import { Component, inject} from '@angular/core';
import { LeaderboardService } from '../services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  imports: [],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css',
})
export class LeaderboardComponent {

  datos: any;
  api = inject(LeaderboardService);

  llamarApi() {
    console.log(this.api.obtenerDatos());
  }
}

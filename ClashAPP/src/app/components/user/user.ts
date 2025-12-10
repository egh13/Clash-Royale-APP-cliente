import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user-service';

interface UserInterface {
  tag: string;
  name: string;
  expLevel: number;
  trophies: number;
  bestTrophies: number;
  wins: number;
  losses: number;
  battleCount: number;
  threeCrownWins: number;
  challengeCardsWon: number;
  challengeMaxWins: number;
  clanCardsCollected: number;
  donations: number;
  donationsReceived: number;
  totalDonations: number;
  expPoints: number;
  totalExpPoints: number;
  legacyTrophyRoadHighScore: number;
  tournamentBattleCount: number;
  tournamentCardsWon: number;
  warDayWins: number;
  role: string;
  starPoints: number;
}

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {

  userService = inject(UserService);
  private userId = 'Y88YCCCPJ'; //example id

  user: UserInterface | null = null;

  getUser() {
    this.userService.getUserInfo(this.userId).subscribe({
      next: (data: UserInterface) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Error obteniendo usuario:', err);
      },
    });
  }

  public ngOnInit(){
    this.getUser();
  }
}

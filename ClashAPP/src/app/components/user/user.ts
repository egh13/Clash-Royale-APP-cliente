import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';
import { ActivatedRoute } from '@angular/router';

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
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
})

export class User implements OnInit {

  // para testing http://localhost:4200/user/Y88YCCCPJ
  
  userId: string | null = null;
  user: UserInterface | null = null;
  mensajeError: string = '';

  userService = inject(UserService);
  route = inject(ActivatedRoute);

  ngOnInit() {
    // Suscribirse a cambios en el parámetro id
    this.route.paramMap.subscribe(params => {
      const tag = params.get('id');
      if (tag) {
        this.getUser(tag);
      }
    });
  }

  getUser(tag: string) {
    this.user = null;
    this.mensajeError = '';

    this.userService.getUserInfo(tag).subscribe({
      next: (data: UserInterface | any) => {
        if (!("error" in data)) {
          this.user = data;
        } else {
          this.mensajeError = "Usuario no encontrado";
        }
      },
      error: (err) => {
        this.mensajeError = "Error al obtener usuario";
      },
    });
  }
}

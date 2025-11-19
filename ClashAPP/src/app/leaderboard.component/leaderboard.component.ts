import { Component, input, OnInit } from '@angular/core';
import { LeaderboardService } from '../services/leaderboard.service';

interface LeaderboardItem {
  tag: string;
  name: string;
  rank: number;
  previousRank: number;
  location: {
    id: number;
    name: string;
    isCountry: boolean;
    countryCode: string;
  };
  clanScore: number;
  members: number;
  badgeId: number;
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  leaderboardData: LeaderboardItem[] = [];

  //default leaderboard global
  countryCode = input<string>('57000000');
  countryName = input<string>('Global');

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit(): void {
    this.llamarApi();
  }

  llamarApi(): void {
    this.leaderboardService.obtenerLeaderboard(this.countryCode()).subscribe({
      next: (data: any) => {
        if (data && data.items) {
          this.leaderboardData = data.items;
        } else {
          console.error('Invalid data format received:', data);
          // Handle the error appropriately, e.g., display an error message in the template
        }
      },
      error: (error: any) => {
        console.error('Error fetching leaderboard:', error);
        // Handle the error, e.g., display an error message in the template
      },
    });
  }
}

import { Component } from '@angular/core';
import { Card } from './card.model';
import { Mazo } from './mazo.model';
 
@Component({
  selector: 'app-mazos',
  standalone: true,
  templateUrl: './mazos.component.html',
  styleUrls: ['./mazos.component.css']
})
export class MazosComponent {
 
cards: Card[] = [
  { name: 'Miner', image: 'CartasRoyale/Card_Miner.png', elixir: 3, type: 'Tropa' },
  { name: 'Hog Rider', image: 'CartasRoyale/Card_Hog Rider.png', elixir: 4, type: 'Tropa' },
  { name: 'Mega Knight', image: 'CartasRoyale/Card_Mega Knight.png', elixir: 7, type: 'Tropa' },
  { name: 'PEKKA', image: 'CartasRoyale/Card_PEKKA.png', elixir: 7, type: 'Tropa' },
  { name: 'Royale Giant', image: 'CartasRoyale/Card_Royale Giant.png', elixir: 6, type: 'Tropa' },
  { name: 'Balloon', image: 'CartasRoyale/Card_Balloon.png', elixir: 5, type: 'Tropa' },
  { name: 'Electro Giant', image: 'CartasRoyale/Card_Electro Giant.png', elixir: 5, type: 'Tropa' },
  { name: 'The Log', image: 'CartasRoyale/Card_The Log.png', elixir: 2, type: 'Hechizo' }
];
 
//mazos: Mazo[] = [
//  { name: 'Miner Poison Control', cards:['Miner', 'Knight', 'Musketeer', 'Skeletons', 'Ice Spirit', 'Inferno Tower', 'Poison', 'The Log'], elixir:2.9 }
//]
 
mazos: Mazo[] = [
  { name: 'Miner Poison Control', cards: ['Miner','Knight','Musketeer','Skeletons','Ice Spirit','Inferno Tower','Poison','The Log'], elixir: 2.9 },
  { name: 'Hog 2.6 Cycle', cards: ['Hog Rider','Ice Golem','Musketeer','Skeletons','Ice Spirit','Cannon','Fireball','The Log'], elixir: 2.6 },
  { name: 'Mega Knight Bait', cards: ['Mega Knight','Miner','Wall Breakers','Bats','Spear Goblins','Inferno Dragon','Zap','Fireball'], elixir: 3.6 },
  { name: 'PEKKA Bridge Spam', cards: ['PEKKA','Battle Ram','Bandit','Royal Ghost','Electro Wizard','Magic Archer','Poison','Zap'], elixir: 4.3 },
  { name: 'Royale Giant Fisherman', cards: ['Royale Giant','Fisherman','Hunter','Mother Witch','Skeletons','Fireball','The Log','Electro Spirit'], elixir: 3.8 },
  { name: 'Log Bait', cards: ['The Log','Princess','Knight','Goblin Gang','Inferno Tower','Rocket','Goblin Barrel','Ice Spirit'], elixir: 3.3 },
  { name: 'Electro Giant Beatdown', cards: ['Electro Giant','Night Witch','Tornado','Baby Dragon','Electro Wizard','Barbarian Barrel','Lightning','Mega Minion'], elixir: 4.7 },
  { name: 'X-Bow Siege', cards: ['X-Bow','Tesla','Archer','Ice Golem','Skeletons','Fireball','The Log','Ice Spirit'], elixir: 3.9 },
  { name: 'Golem Beatdown', cards: ['Golem','Night Witch','Baby Dragon','Tornado','Electro Wizard','Barbarian Barrel','Lightning','Mega Minion'], elixir: 4.9 },
  { name: 'LavaLoon', cards: ['Lava Hound','Balloon','Mega Minion','Minion','Tombstone','Fireball','The Log','Zap'], elixir: 3.8 },
  { name: 'Graveyard Control', cards: ['Graveyard','Knight','Musketeer','Skeletons','Ice Spirit','Cannon','Poison','The Log'], elixir: 3.2 },
  { name: 'Royal Hogs Cycle', cards: ['Royal Hogs','Ice Golem','Musketeer','Skeletons','Ice Spirit','Cannon','Fireball','The Log'], elixir: 3.1 },
  { name: 'Giant Double Prince', cards: ['Giant','Dark Prince','Prince','Electro Wizard','Poison','Zap','Tornado','The Log'], elixir: 4.5 },
  { name: 'Miner Bait', cards: ['Goblin Barrel','Miner','Princess','Knight','Musketeer','Skeletons','Ice Spirit','The Log'], elixir: 3.0 },
  { name: 'Balloon Freeze', cards: ['Balloon','Lumberjack','Bowler','Baby Dragon','Ice Wizard','Tornado','Freeze','Barbarian Barrel'], elixir: 4.1 }
];
 
selectedCard: Card | null = null;
randomMazo: Mazo | null = null;
 
selectCard(card: Card) {
  this.selectedCard = card;
  this.randomMazo = null; // resetea la selección aleatoria
}
 
selectRandomMazo() {
  const randomIndex = Math.floor(Math.random() * this.mazos.length);
  this.randomMazo = this.mazos[randomIndex];
  this.selectedCard = null; // resetea la selección por carta
}
}
 
 
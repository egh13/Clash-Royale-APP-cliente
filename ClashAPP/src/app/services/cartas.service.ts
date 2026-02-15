import { Injectable } from '@angular/core';
import { Carta } from '../interfaces/mazo.interface';

@Injectable({
  providedIn: 'root'
})
export class CartasService {
  
  private readonly cartasData: Carta[] = [
    // Champion Cards
    { id: '1', nombre: 'Archer Queen', imagen: '/CartasRoyale/Card_Archer Queen.png', coste: 5, tipo: 'Champion' },
    { id: '2', nombre: 'Golden Knight', imagen: '/CartasRoyale/Card_Golden Knight.png', coste: 4, tipo: 'Champion' },
    { id: '3', nombre: 'Skeleton King', imagen: '/CartasRoyale/Card_Skeleton King.png', coste: 4, tipo: 'Champion' },
    { id: '4', nombre: 'Mighty Miner', imagen: '/CartasRoyale/Card_Mighty Miner.png', coste: 4, tipo: 'Champion' },
    { id: '5', nombre: 'Monk', imagen: '/CartasRoyale/Card_Monk.png', coste: 5, tipo: 'Champion' },
    
    // Legendary Cards
    { id: '6', nombre: 'Bandit', imagen: '/CartasRoyale/Card_Bandit.png', coste: 3, tipo: 'Legendary' },
    { id: '7', nombre: 'Electro Dragon', imagen: '/CartasRoyale/Card_Electro Dragon.png', coste: 5, tipo: 'Legendary' },
    { id: '8', nombre: 'Electro Wizard', imagen: '/CartasRoyale/Card_Electro Wizard.png', coste: 4, tipo: 'Legendary' },
    { id: '9', nombre: 'Fisherman', imagen: '/CartasRoyale/Card_Fisherman.png', coste: 3, tipo: 'Legendary' },
    { id: '10', nombre: 'Ghost', imagen: '/CartasRoyale/Card_Royal Ghost.png', coste: 3, tipo: 'Legendary' },
    { id: '11', nombre: 'Graveyard', imagen: '/CartasRoyale/Card_Graveyard.png', coste: 5, tipo: 'Legendary' },
    { id: '12', nombre: 'Ice Wizard', imagen: '/CartasRoyale/Card_Ice Wizard.png', coste: 3, tipo: 'Legendary' },
    { id: '13', nombre: 'Inferno Dragon', imagen: '/CartasRoyale/Card_Inferno Dragon.png', coste: 4, tipo: 'Legendary' },
    { id: '14', nombre: 'Lava Hound', imagen: '/CartasRoyale/Card_Lava Hound.png', coste: 7, tipo: 'Legendary' },
    { id: '15', nombre: 'Lumberjack', imagen: '/CartasRoyale/Card_Lumberjack.png', coste: 4, tipo: 'Legendary' },
    { id: '16', nombre: 'Magic Archer', imagen: '/CartasRoyale/Card_Magic Archer.png', coste: 4, tipo: 'Legendary' },
    { id: '17', nombre: 'Mega Knight', imagen: '/CartasRoyale/Card_Mega Knight.png', coste: 7, tipo: 'Legendary' },
    { id: '18', nombre: 'Miner', imagen: '/CartasRoyale/Card_Miner.png', coste: 3, tipo: 'Legendary' },
    { id: '19', nombre: 'Mother Witch', imagen: '/CartasRoyale/Card_Mother Witch.png', coste: 4, tipo: 'Legendary' },
    { id: '20', nombre: 'Night Witch', imagen: '/CartasRoyale/Card_Night Witch.png', coste: 4, tipo: 'Legendary' },
    { id: '21', nombre: 'Princess', imagen: '/CartasRoyale/Card_Princess.png', coste: 3, tipo: 'Legendary' },
    { id: '22', nombre: 'Ram Rider', imagen: '/CartasRoyale/Card_Ram Rider.png', coste: 5, tipo: 'Legendary' },
    { id: '23', nombre: 'Sparky', imagen: '/CartasRoyale/Card_Sparky.png', coste: 6, tipo: 'Legendary' },
    { id: '24', nombre: 'The Log', imagen: '/CartasRoyale/Card_The Log.png', coste: 2, tipo: 'Legendary' },
    { id: '25', nombre: 'Phoenix', imagen: '/CartasRoyale/Card_Pheonix.png', coste: 4, tipo: 'Legendary' },

    // Epic Cards
    { id: '26', nombre: 'Baby Dragon', imagen: '/CartasRoyale/Card_Baby Dragon.png', coste: 4, tipo: 'Epic' },
    { id: '27', nombre: 'Balloon', imagen: '/CartasRoyale/Card_Balloon.png', coste: 5, tipo: 'Epic' },
    { id: '28', nombre: 'Barbarian Barrel', imagen: '/CartasRoyale/Card_Barbarian Barrel.png', coste: 2, tipo: 'Epic' },
    { id: '29', nombre: 'Bowler', imagen: '/CartasRoyale/Card_Bowler.png', coste: 5, tipo: 'Epic' },
    { id: '30', nombre: 'Cannon Cart', imagen: '/CartasRoyale/Card_Cannon Cart.png', coste: 5, tipo: 'Epic' },
    { id: '31', nombre: 'Clone', imagen: '/CartasRoyale/Card_Clone.png', coste: 3, tipo: 'Epic' },
    { id: '32', nombre: 'Dark Prince', imagen: '/CartasRoyale/Card_Dark Prince.png', coste: 4, tipo: 'Epic' },
    { id: '33', nombre: 'Earthquake', imagen: '/CartasRoyale/Card_Earthquake.png', coste: 3, tipo: 'Epic' },
    { id: '34', nombre: 'Electro Giant', imagen: '/CartasRoyale/Card_Electro Giant.png', coste: 7, tipo: 'Epic' },
    { id: '35', nombre: 'Elite Barbarians', imagen: '/CartasRoyale/Card_Elite Barbarians.png', coste: 6, tipo: 'Epic' },
    { id: '36', nombre: 'Executioner', imagen: '/CartasRoyale/Card_Executioner.png', coste: 5, tipo: 'Epic' },
    { id: '37', nombre: 'Freeze', imagen: '/CartasRoyale/Card_Freeze.png', coste: 4, tipo: 'Epic' },
    { id: '38', nombre: 'Giant Skeleton', imagen: '/CartasRoyale/Card_Giant Bomber.png', coste: 6, tipo: 'Epic' },
    { id: '39', nombre: 'Goblin Barrel', imagen: '/CartasRoyale/Card_Goblin Barrel.png', coste: 3, tipo: 'Epic' },
    { id: '40', nombre: 'Goblin Drill', imagen: '/CartasRoyale/Card_Goblin Drill.png', coste: 4, tipo: 'Epic' },
    { id: '41', nombre: 'Golem', imagen: '/CartasRoyale/Card_Golem.png', coste: 8, tipo: 'Epic' },
    { id: '42', nombre: 'Hunter', imagen: '/CartasRoyale/Card_Hunter.png', coste: 4, tipo: 'Epic' },
    { id: '43', nombre: 'Lightning', imagen: '/CartasRoyale/Card_Lightning.png', coste: 6, tipo: 'Epic' },
    { id: '44', nombre: 'Mirror', imagen: '/CartasRoyale/Card_Mirror.png', coste: 0, tipo: 'Epic' },
    { id: '45', nombre: 'PEKKA', imagen: '/CartasRoyale/Card_PEKKA.png', coste: 7, tipo: 'Epic' },
    { id: '46', nombre: 'Poison', imagen: '/CartasRoyale/Card_Poison.png', coste: 4, tipo: 'Epic' },
    { id: '47', nombre: 'Prince', imagen: '/CartasRoyale/Card_Prince.png', coste: 5, tipo: 'Epic' },
    { id: '48', nombre: 'Rage', imagen: '/CartasRoyale/Card_Rage.png', coste: 2, tipo: 'Epic' },
    { id: '49', nombre: 'Rocket', imagen: '/CartasRoyale/Card_Rocket.png', coste: 6, tipo: 'Epic' },
    { id: '50', nombre: 'Skeleton Army', imagen: '/CartasRoyale/Card_Skeleton Army.png', coste: 3, tipo: 'Epic' },
    { id: '51', nombre: 'Tornado', imagen: '/CartasRoyale/Card_Tornado.png', coste: 3, tipo: 'Epic' },
    { id: '52', nombre: 'Wall Breakers', imagen: '/CartasRoyale/Card_Wall Breakers.png', coste: 2, tipo: 'Epic' },
    { id: '53', nombre: 'Witch', imagen: '/CartasRoyale/Card_Witch.png', coste: 5, tipo: 'Epic' },
    { id: '54', nombre: 'X-Bow', imagen: '/CartasRoyale/Card_x-bow.png', coste: 6, tipo: 'Epic' },

    // Rare Cards
    { id: '55', nombre: 'Battle Healer', imagen: '/CartasRoyale/Card_Battle Healer.png', coste: 4, tipo: 'Rare' },
    { id: '56', nombre: 'Battle Ram', imagen: '/CartasRoyale/Card_Battle Ram.png', coste: 4, tipo: 'Rare' },
    { id: '57', nombre: 'Elixir Collector', imagen: '/CartasRoyale/Card_Elixir Collector.png', coste: 6, tipo: 'Rare' },
    { id: '58', nombre: 'Fireball', imagen: '/CartasRoyale/Card_Fireball.png', coste: 4, tipo: 'Rare' },
    { id: '59', nombre: 'Flying Machine', imagen: '/CartasRoyale/Card_Flying Machine.png', coste: 4, tipo: 'Rare' },
    { id: '60', nombre: 'Giant', imagen: '/CartasRoyale/Card_Giant.png', coste: 5, tipo: 'Rare' },
    { id: '61', nombre: 'Goblin Cage', imagen: '/CartasRoyale/Card_Goblin Cage.png', coste: 4, tipo: 'Rare' },
    { id: '62', nombre: 'Hog Rider', imagen: '/CartasRoyale/Card_Hog Rider.png', coste: 4, tipo: 'Rare' },
    { id: '63', nombre: 'Ice Golem', imagen: '/CartasRoyale/Card_Ice Golem.png', coste: 2, tipo: 'Rare' },
    { id: '64', nombre: 'Inferno Tower', imagen: '/CartasRoyale/Card_Inferno Tower.png', coste: 5, tipo: 'Rare' },
    { id: '65', nombre: 'Mega Minion', imagen: '/CartasRoyale/Card_Mega Minion.png', coste: 3, tipo: 'Rare' },
    { id: '66', nombre: 'Mini PEKKA', imagen: '/CartasRoyale/Card_Mini PEKKA.png', coste: 4, tipo: 'Rare' },
    { id: '67', nombre: 'Musketeer', imagen: '/CartasRoyale/Card_Musketeer.png', coste: 4, tipo: 'Rare' },
    { id: '68', nombre: 'Royal Delivery', imagen: '/CartasRoyale/Card_Royal Delivery.png', coste: 3, tipo: 'Rare' },
    { id: '69', nombre: 'Royal Giant', imagen: '/CartasRoyale/Card_Royale Giant.png', coste: 6, tipo: 'Rare' },
    { id: '70', nombre: 'Royal Hogs', imagen: '/CartasRoyale/Card_Royal Hogs.png', coste: 5, tipo: 'Rare' },
    { id: '71', nombre: 'Three Musketeers', imagen: '/CartasRoyale/Card_Three Musketeers.png', coste: 9, tipo: 'Rare' },
    { id: '72', nombre: 'Valkyrie', imagen: '/CartasRoyale/Card_Valkyrie.png', coste: 4, tipo: 'Rare' },
    { id: '73', nombre: 'Wizard', imagen: '/CartasRoyale/Card_Wizard.png', coste: 5, tipo: 'Rare' },

    // Common Cards
    { id: '74', nombre: 'Arrows', imagen: '/CartasRoyale/Card_Arrows.png', coste: 3, tipo: 'Common' },
    { id: '75', nombre: 'Barbarian Hut', imagen: '/CartasRoyale/Card_Barbarian Hut.png', coste: 7, tipo: 'Common' },
    { id: '76', nombre: 'Bats', imagen: '/CartasRoyale/Card_Bats.png', coste: 2, tipo: 'Common' },
    { id: '77', nombre: 'Bomb Tower', imagen: '/CartasRoyale/Card_Bomb Tower.png', coste: 4, tipo: 'Common' },
    { id: '78', nombre: 'Bomber', imagen: '/CartasRoyale/Card_Bomber.png', coste: 2, tipo: 'Common' },
    { id: '79', nombre: 'Cannon', imagen: '/CartasRoyale/Card_Cannon.png', coste: 3, tipo: 'Common' },
    { id: '80', nombre: 'Dart Goblin', imagen: '/CartasRoyale/Card_Dart Goblin.png', coste: 3, tipo: 'Common' },
    { id: '81', nombre: 'Electro Spirit', imagen: '/CartasRoyale/Card_Electro Spirit.png', coste: 1, tipo: 'Common' },
    { id: '82', nombre: 'Elixir Golem', imagen: '/CartasRoyale/Card_Elixir Golem.png', coste: 3, tipo: 'Common' },
    { id: '83', nombre: 'Fire Spirit', imagen: '/CartasRoyale/Card_Fire Spirit.png', coste: 1, tipo: 'Common' },
    { id: '84', nombre: 'Furnace', imagen: '/CartasRoyale/Card_Furnace.png', coste: 4, tipo: 'Common' },
    { id: '85', nombre: 'Goblin Gang', imagen: '/CartasRoyale/Card_Goblin Gang.png', coste: 3, tipo: 'Common' },
    { id: '86', nombre: 'Goblin Giant', imagen: '/CartasRoyale/Card_Goblin Giant.png', coste: 6, tipo: 'Common' },
    { id: '87', nombre: 'Goblin Hut', imagen: '/CartasRoyale/Card_Goblin Hut.png', coste: 5, tipo: 'Common' },
    { id: '88', nombre: 'Goblins', imagen: '/CartasRoyale/Card_Goblin.png', coste: 2, tipo: 'Common' },
    { id: '89', nombre: 'Guards', imagen: '/CartasRoyale/Card_Giards.png', coste: 3, tipo: 'Common' },
    { id: '90', nombre: 'Heal Spirit', imagen: '/CartasRoyale/Card_Heal Spirit.png', coste: 1, tipo: 'Common' },
    { id: '91', nombre: 'Ice Spirit', imagen: '/CartasRoyale/Card_Ice Spirit.png', coste: 1, tipo: 'Common' },
    { id: '92', nombre: 'Minion Horde', imagen: '/CartasRoyale/Card_Minion Horde.png', coste: 5, tipo: 'Common' },
    { id: '93', nombre: 'Minions', imagen: '/CartasRoyale/Card_Minion.png', coste: 3, tipo: 'Common' },
    { id: '94', nombre: 'Mortar', imagen: '/CartasRoyale/Card_Mortar.png', coste: 4, tipo: 'Common' },
    { id: '95', nombre: 'Rascals', imagen: '/CartasRoyale/Card_Rascals.png', coste: 5, tipo: 'Common' },
    { id: '96', nombre: 'Royal Recruits', imagen: '/CartasRoyale/Card_Royale Recruits.png', coste: 7, tipo: 'Common' },
    { id: '97', nombre: 'Skeleton Barrel', imagen: '/CartasRoyale/Card_Skeleton Barrel.png', coste: 3, tipo: 'Common' },
    { id: '98', nombre: 'Skeleton Dragons', imagen: '/CartasRoyale/Card_Skeleton Dragons.png', coste: 4, tipo: 'Common' },
    { id: '99', nombre: 'Snowball', imagen: '/CartasRoyale/Card_Snowball.png', coste: 2, tipo: 'Common' },
    { id: '100', nombre: 'Spear Goblins', imagen: '/CartasRoyale/Card_Spear Goblins.png', coste: 2, tipo: 'Common' },
    { id: '101', nombre: 'Tesla', imagen: '/CartasRoyale/Card_Tesla.png', coste: 4, tipo: 'Common' },
    { id: '102', nombre: 'Tombstone', imagen: '/CartasRoyale/Card_Tombstone.png', coste: 3, tipo: 'Common' },
    { id: '103', nombre: 'Zap', imagen: '/CartasRoyale/Card_Zap.png', coste: 2, tipo: 'Common' },
    { id: '104', nombre: 'Zappies', imagen: '/CartasRoyale/Card_Zappies.png', coste: 4, tipo: 'Common' }
  ];

  getAllCartas(): Carta[] {
    return this.cartasData;
  }

  getCartasByTipo(tipo: string): Carta[] {
    return this.cartasData.filter(carta => carta.tipo === tipo);
  }

  getCartasByCoste(coste: number): Carta[] {
    return this.cartasData.filter(carta => carta.coste === coste);
  }

  getCartaById(id: string): Carta | undefined {
    return this.cartasData.find(carta => carta.id === id);
  }

  searchCartas(searchTerm: string): Carta[] {
    const term = searchTerm.toLowerCase();
    return this.cartasData.filter(carta => 
      carta.nombre.toLowerCase().includes(term) ||
      carta.tipo?.toLowerCase().includes(term)
    );
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { CardStats } from '../interfaces/card-stats.interface';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las estadísticas del JSON local
   */
  getAllCardStats(): Observable<CardStats[]> {
    const jsonPath = 'data/cards.json';
    
    return this.http.get<CardStats[]>(jsonPath).pipe(
      catchError(error => {
        console.error('Error cargando estadísticas:', error);
        return of([]);
      })
    );
  }

  /**
   * Obtiene las estadísticas de una carta específica por nombre
   */
  getStatsByCardName(cardName: string): Observable<CardStats | null> {
    return this.getAllCardStats().pipe(
      map(cards => {
        let card = cards.find(c => c.name.toLowerCase() === cardName.toLowerCase());
        
        if (!card) {
          card = this.findCardWithMapping(cards, cardName);
        }
        
        return card || null;
      }),
      catchError(error => {
        console.error(`Error obteniendo stats para ${cardName}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Intenta encontrar una carta usando mapeos especiales y coincidencias parciales
   */
  private findCardWithMapping(cards: CardStats[], searchName: string): CardStats | undefined {
    const normalizedSearch = searchName.toLowerCase().trim();
    
    const nameMapping: Record<string, string> = {
      'three musketeers': 'Three Musketeers',
      'mini pekka': 'Mini P.E.K.K.A.',
      'pekka': 'P.E.K.K.A.',
    };

    if (nameMapping[normalizedSearch]) {
      const mappedCard = cards.find(c => 
        c.name.toLowerCase() === nameMapping[normalizedSearch].toLowerCase()
      );
      if (mappedCard) {
        return mappedCard;
      }
    }

    const partialMatch = cards.find(c => 
      c.name.toLowerCase().includes(normalizedSearch) ||
      normalizedSearch.includes(c.name.toLowerCase())
    );

    return partialMatch;
  }

  /**
   * Obtiene los niveles disponibles para una carta
   */
  getAvailableLevels(cardStats: CardStats): number[] {
    return cardStats.levels.map(level => level.level).sort((a, b) => a - b);
  }

  /**
   * Obtiene las estadísticas para un nivel específico
   */
  getStatsForLevel(cardStats: CardStats, level: number) {
    return cardStats.levels.find(l => l.level === level);
  }
}
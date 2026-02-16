/**
 * Interfaces basadas en la estructura real del JSON cards.json
 * Soporta 3 tipos de cartas: Tropas, Hechizos y Estructuras
 */

export interface CardLevel {
  level: number;
  // Tropas y Estructuras tienen hitpoints
  hitpoints?: number;
  // Todas las cartas tienen damage
  damage: number;
  // Propiedades adicionales que puedan existir
  [key: string]: any;
}

export interface CardStats {
  name: string;
  target: string;
  
  // Atributos de TROPAS (troops)
  hit_speed?: number;
  range?: number;
  count?: number;
  
  // Atributos de HECHIZOS (spells)
  radius?: number;      // Hechizos normales (Arrows, Fireball, etc.)
  width?: number;       // Hechizos especiales (The Log, Barbarian Barrel)
  
  // Atributos de ESTRUCTURAS (buildings)
  lifetime?: number;
  spawn_speed?: number;
  
  // Niveles con stats
  levels: CardLevel[];
  
  // Propiedades adicionales
  [key: string]: any;
}

export interface CardDialogData {
  // Datos de la carta del catálogo
  id: string;
  name: string;
  rarity: string;
  elixirCost: number;
  images: string[];
  hasEvolution?: boolean;
  hasHero?: boolean;
  // Stats detallados del JSON
  stats?: CardStats;
}

/**
 * Tipos de cartas según sus atributos
 */
export type CardType = 'troop' | 'spell' | 'building';
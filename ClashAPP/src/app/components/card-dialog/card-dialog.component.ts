import { 
  Component, 
  Inject, 
  signal, 
  computed,
  viewChild,
  effect,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CardService } from '../../services/card.service';
import { CardDialogData, CardStats, CardLevel, CardType } from '../../interfaces/card-stats.interface';

@Component({
  selector: 'app-card-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardDialogComponent {

  // Signal-based ViewChild query
  sort = viewChild(MatSort);

  // Signals para el estado
  loading = signal(true);
  cardStats = signal<CardStats | null>(null);
  selectedLevel = signal<number>(1);
  cardType = signal<CardType>('troop');
  
  // Computed signals
  availableLevels = computed(() => {
    const stats = this.cardStats();
    if (!stats || !stats.levels.length) return [];
    return stats.levels.map(level => level.level).sort((a, b) => a - b);
  });

  currentStats = computed(() => {
    const stats = this.cardStats();
    const level = this.selectedLevel();
    if (!stats) return null;
    return stats.levels.find(l => l.level === level) || stats.levels[0];
  });

  // Propiedades para la tabla
  displayedColumns: string[] = ['level', 'hitpoints', 'damage'];
  dataSource = new MatTableDataSource<CardLevel>();

  constructor(
    public dialogRef: MatDialogRef<CardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CardDialogData,
    private cardService: CardService
  ) {
    // Cargar estadísticas al inicializar
    this.loadCardStats();
    
    // Configurar MatSort cuando esté disponible
    effect(() => {
      const sortInstance = this.sort();
      if (sortInstance) {
        this.dataSource.sort = sortInstance;
      }
    });
  }

  private loadCardStats(): void {
    this.cardService.getStatsByCardName(this.data.name).subscribe({
      next: (stats) => {
        if (stats) {
          this.cardStats.set(stats);
          this.dataSource.data = stats.levels;
          this.cardType.set(this.detectCardType(stats));
          
          const firstLevel = stats.levels[0]?.level || 1;
          this.selectedLevel.set(firstLevel);

          this.updateTableColumns(stats.levels[0]);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error cargando stats:', error);
        this.loading.set(false);
      }
    });
  }

  private updateTableColumns(sampleLevel: CardLevel): void {
    const columns = ['level'];
    
    if (sampleLevel.hitpoints !== undefined) {
      columns.push('hitpoints');
    }
    
    if (sampleLevel.damage !== undefined) {
      columns.push('damage');
    }
    
    Object.keys(sampleLevel).forEach(prop => {
      if (!['level', 'hitpoints', 'damage'].includes(prop)) {
        columns.push(prop);
      }
    });
    
    this.displayedColumns = columns;
  }

  onLevelChange(newLevel: number): void {
    this.selectedLevel.set(newLevel);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getRarityClass(): string {
    return this.data.rarity?.toLowerCase() || 'common';
  }

  // Helper para formatear nombres de columnas
  formatColumnName(column: string): string {
    const translations: Record<string, string> = {
      'level': 'Nivel',
      'hitpoints': 'Vida',
      'damage': 'Daño',
      'hit_speed': 'Vel. Ataque',
      'range': 'Alcance',
      'count': 'Cantidad',
      'target': 'Objetivo',
      'radius': 'Radio',
      'width': 'Ancho',
      'lifetime': 'Duración',
      'spawn_speed': 'Spawn'
    };
    
    return translations[column] || column.charAt(0).toUpperCase() + column.slice(1).replace('_', ' ');
  }

  // Helper para obtener propiedades extra del nivel actual
  getExtraProps(stats: any): string[] {
    if (!stats) return [];
    return Object.keys(stats).filter(prop => 
      !['level', 'hitpoints', 'damage'].includes(prop)
    );
  }

  /**
   * Detecta automáticamente el tipo de carta basándose en sus atributos
   */
  private detectCardType(stats: CardStats): CardType {
    // HECHIZOS: tienen radius o width, NO tienen hit_speed
    if (stats.radius !== undefined || stats.width !== undefined) {
      return 'spell';
    }
    
    // ESTRUCTURAS: tienen lifetime y/o spawn_speed
    if (stats.lifetime !== undefined || stats.spawn_speed !== undefined) {
      return 'building';
    }
    
    // TROPAS: tienen hit_speed, range, count
    return 'troop';
  }

  /**
   * Obtiene el icono apropiado según el tipo de carta
   */
  getCardTypeIcon(): string {
    switch (this.cardType()) {
      case 'spell': return '✨';
      case 'building': return '🏰';
      case 'troop': return '⚔️';
      default: return '📋';
    }
  }

  /**
   * Obtiene el nombre del tipo de carta en español
   */
  getCardTypeName(): string {
    switch (this.cardType()) {
      case 'spell': return 'Hechizo';
      case 'building': return 'Estructura';
      case 'troop': return 'Tropa';
      default: return 'Carta';
    }
  }
}
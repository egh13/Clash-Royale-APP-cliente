import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCatalogService } from '../../services/card-catalog.service';

type SortField = 'name' | 'elixir' | 'rarity';
type SortDir = 'asc' | 'desc';

@Component({
  selector: 'app-card-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-catalog.component.html',
  styleUrls: ['./card-catalog.component.css']
})
export class CardCatalogComponent implements OnInit {

  /* =========================
     RAW DATA
  ========================= */
  private cardsRaw: any[] = [];

  /* =========================
     STATE (SIGNALS)
  ========================= */
  cards = signal<any[]>([]);
  loading = signal(true);
  error = signal('');

  sortField = signal<SortField>('name');
  sortDir = signal<SortDir>('asc');

  searchTerm = signal(''); // 🔍 búsqueda por nombre

  constructor(private cardService: CardCatalogService) {}

  /* =========================
     LIFECYCLE
  ========================= */
  ngOnInit(): void {
    this.cardService.getAllCards().subscribe({
      next: (data: { items: any[] }) => {

        this.cardsRaw = (data.items || []).map(card => {
          const images: string[] = [];

          if (card.iconUrls?.medium) images.push(card.iconUrls.medium);
          if (card.iconUrls?.evolutionMedium) images.push(card.iconUrls.evolutionMedium);
          if (card.iconUrls?.heroMedium) images.push(card.iconUrls.heroMedium);

          return {
            ...card,
            images,
            hasEvolution: !!card.iconUrls?.evolutionMedium,
            hasHero: !!card.iconUrls?.heroMedium
          };
        });

        this.applyFiltersAndSort();
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error cargando cartas.');
        this.loading.set(false);
      }
    });
  }

  /* =========================
     EVENTS
  ========================= */
  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
    this.applyFiltersAndSort();
  }

  setSort(field: SortField): void {
    if (this.sortField() === field) {
      this.sortDir.set(this.sortDir() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField.set(field);
      this.sortDir.set('asc');
    }

    this.applyFiltersAndSort();
  }

  /* =========================
     FILTER + SORT
  ========================= */
  private applyFiltersAndSort(): void {
    const dir = this.sortDir() === 'asc' ? 1 : -1;
    const field = this.sortField();
    const term = this.searchTerm().toLowerCase();

    const rarityOrder: Record<string, number> = {
      common: 1,
      rare: 2,
      epic: 3,
      legendary: 4,
      champion: 5
    };

    const filtered = this.cardsRaw.filter(card =>
      card.name.toLowerCase().includes(term)
    );

    const sorted = filtered.sort((a, b) => {
      let result = 0;

      if (field === 'name') {
        result = a.name.localeCompare(b.name);
      }

      if (field === 'elixir') {
        result = a.elixirCost - b.elixirCost;
      }

      if (field === 'rarity') {
        result = rarityOrder[a.rarity] - rarityOrder[b.rarity];
      }

      return result * dir;
    });

    this.cards.set(sorted);
  }
}

import { Component, inject, effect, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MazosService } from '../../services/mazos.service';
import { AuthService } from '../../services/auth-service';
import { ToastService } from '../../services/toast-service';
import { CartasService } from '../../services/cartas.service';
import { Mazo, Carta, CreateMazoRequest, UpdateMazoRequest } from '../../interfaces/mazo.interface';

@Component({
  selector: 'app-mis-mazos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mis-mazos.component.html',
  styleUrls: ['./mis-mazos.component.css']
})
export class MisMazosComponent {
  
  private mazosService = inject(MazosService);
  private authService = inject(AuthService);
  private toast = inject(ToastService);
  private cartasService = inject(CartasService);
  private fb = inject(FormBuilder);

  // Estados del componente
  mazos: Mazo[] = [];
  loading = false;
  showForm = false;
  editingMazo: Mazo | null = null;
  
  // Formulario
  mazoForm!: FormGroup;
  
  // Selección de cartas
  selectedCartas: Carta[] = [];
  
  // Catálogo de cartas disponibles - ahora usando el servicio completo
  availableCartas: Carta[] = [];
  filteredCartas: Carta[] = [];
  
  // Filtros de cartas
  searchTerm = '';
  selectedTipo = '';
  selectedCoste = '';
  
  // Tipos de cartas disponibles para filtro
  tiposDisponibles = ['Champion', 'Legendary', 'Epic', 'Rare', 'Common'];
  costesDisponibles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  // Modos de juego disponibles
  modosJuego = [
    'Ladder',
    'Torneo',
    'Desafío Clásico',
    'Desafío Gran',
    'Guerra de Clanes',
    'Modo Fiesta',
    'Draft',
    'Triple Elixir',
    'Sudden Death'
  ];

  constructor() {
    this.initForm();
    this.loadCartas();
    this.loadMazos();
    this.subscribeToMazos();
  }

  private initForm(): void {
    this.mazoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      modoJuego: ['', Validators.required]
    });
  }

  private loadCartas(): void {
    this.availableCartas = this.cartasService.getAllCartas();
    this.filteredCartas = [...this.availableCartas];
  }

  private loadMazos(): void {
    this.mazosService.getMazos().pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: (mazos: Mazo[]) => {
        this.mazos = mazos;
      },
      error: (error) => {
        this.toast.error(error.message);
        console.error('Error cargando mazos:', error);
      }
    });
  }

  private subscribeToMazos(): void {
    this.mazosService.mazos$.pipe(
      takeUntilDestroyed()
    ).subscribe(mazos => {
      this.mazos = mazos;
    });

    this.mazosService.loading$.pipe(
      takeUntilDestroyed()
    ).subscribe(loading => {
      this.loading = loading;
    });
  }

  // --- GESTIÓN DEL FORMULARIO ---

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.mazoForm.reset();
    this.selectedCartas = [];
    this.editingMazo = null;
  }

  // --- SELECCIÓN DE CARTAS ---

  toggleCarta(carta: Carta): void {
    const index = this.selectedCartas.findIndex(c => c.id === carta.id);
    
    if (index > -1) {
      // Quitar carta
      this.selectedCartas.splice(index, 1);
    } else if (this.selectedCartas.length < 8) {
      // Añadir carta (máximo 8)
      this.selectedCartas.push(carta);
    } else {
      this.toast.info('Solo puedes seleccionar 8 cartas');
    }
  }

  isCartaSelected(carta: Carta): boolean {
    return this.selectedCartas.some(c => c.id === carta.id);
  }

  getCostePromedioElixir(): number {
    if (this.selectedCartas.length === 0) return 0;
    
    const totalCoste = this.selectedCartas.reduce((sum, carta) => sum + (carta.coste || 0), 0);
    return Math.round((totalCoste / this.selectedCartas.length) * 10) / 10;
  }

  getCostePromedioMazo(mazo: Mazo): number {
    if (mazo.cartas.length === 0) return 0;
    
    const totalCoste = mazo.cartas.reduce((sum, carta) => sum + (carta.coste || 0), 0);
    return Math.round((totalCoste / mazo.cartas.length) * 10) / 10;
  }

  // --- FILTRADO DE CARTAS ---

  filterCartas(): void {
    this.filteredCartas = this.availableCartas.filter(carta => {
      const matchesSearch = !this.searchTerm || 
        carta.nombre.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesTipo = !this.selectedTipo || carta.tipo === this.selectedTipo;
      const matchesCoste = !this.selectedCoste || (carta.coste?.toString() === this.selectedCoste);
      
      return matchesSearch && matchesTipo && matchesCoste;
    });
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.filterCartas();
  }

  onTipoChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedTipo = target.value;
    this.filterCartas();
  }

  onCosteChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCoste = target.value;
    this.filterCartas();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedTipo = '';
    this.selectedCoste = '';
    this.filteredCartas = [...this.availableCartas];
  }

  // --- CRUD OPERATIONS ---

  saveMazo(): void {
    if (this.mazoForm.invalid) {
      this.toast.error('Por favor completa todos los campos correctamente');
      this.mazoForm.markAllAsTouched();
      return;
    }

    if (this.selectedCartas.length !== 8) {
      this.toast.error('Debes seleccionar exactamente 8 cartas');
      return;
    }

    const mazoData: CreateMazoRequest | UpdateMazoRequest = {
      nombre: this.mazoForm.value.nombre,
      modoJuego: this.mazoForm.value.modoJuego,
      cartas: this.selectedCartas
    };

    if (this.editingMazo) {
      // Actualizar mazo existente
      this.mazosService.updateMazo(this.editingMazo.id, mazoData).pipe(
        takeUntilDestroyed()
      ).subscribe({
        next: (mazoActualizado: Mazo) => {
          this.toast.success(`Mazo "${mazoActualizado.nombre}" actualizado exitosamente`);
          this.toggleForm();
        },
        error: (error) => {
          this.toast.error(error.message);
          console.error('Error actualizando mazo:', error);
        }
      });
    } else {
      // Crear nuevo mazo
      this.mazosService.createMazo(mazoData as CreateMazoRequest).pipe(
        takeUntilDestroyed()
      ).subscribe({
        next: (nuevoMazo: Mazo) => {
          this.toast.success(`Mazo "${nuevoMazo.nombre}" creado exitosamente`);
          this.toggleForm();
        },
        error: (error) => {
          this.toast.error(error.message);
          console.error('Error creando mazo:', error);
        }
      });
    }
  }

  editMazo(mazo: Mazo): void {
    this.editingMazo = mazo;
    this.showForm = true;
    
    // Cargar datos en el formulario
    this.mazoForm.patchValue({
      nombre: mazo.nombre,
      modoJuego: mazo.modoJuego
    });
    
    // Cargar cartas seleccionadas
    this.selectedCartas = [...mazo.cartas];
  }

  deleteMazo(mazo: Mazo): void {
    const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar el mazo "${mazo.nombre}"?`);
    
    if (!confirmDelete) return;

    this.mazosService.deleteMazo(mazo.id).pipe(
      takeUntilDestroyed()
    ).subscribe({
      next: () => {
        this.toast.success(`Mazo "${mazo.nombre}" eliminado exitosamente`);
      },
      error: (error) => {
        this.toast.error(error.message);
        console.error('Error eliminando mazo:', error);
      }
    });
  }

  // --- UTILIDADES ---

  trackByMazoId(index: number, mazo: Mazo): string {
    return mazo.id;
  }

  trackByCartaId(index: number, carta: Carta): string {
    return carta.id;
  }

  getFormTitle(): string {
    return this.editingMazo ? 'Editar Mazo' : 'Crear Nuevo Mazo';
  }

  getFormButtonText(): string {
    return this.editingMazo ? 'Actualizar Mazo' : 'Crear Mazo';
  }
}
export interface Carta {
  id: string;
  nombre: string;
  imagen: string;
  coste?: number;
  tipo?: string;
}

export interface Mazo {
  id: string;
  nombre: string;
  modoJuego: string;
  cartas: Carta[];
  usuarioId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateMazoRequest {
  nombre: string;
  modoJuego: string;
  cartas: Carta[];
}

export interface UpdateMazoRequest {
  nombre?: string;
  modoJuego?: string;
  cartas?: Carta[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
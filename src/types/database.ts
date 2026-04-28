export interface Categoria {
  id: string;
  nombre: string;
  created_at?: string;
}

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen_url: string;
  categoria_id: string;
  disponible: boolean;
  // Esto es para cuando haces el JOIN con la tabla categorías
  categorias?: {
    nombre: string;
  };
}
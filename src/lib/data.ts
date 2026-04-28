import { supabase } from './supabase';
import { Producto, Categoria } from '@/types/database';

/**
 * Obtiene todas las categorías de la base de datos
 * Ordenadas alfabéticamente por nombre.
 */
export async function getCategories(): Promise<Categoria[]> {
  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .order('nombre', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error.message);
    throw new Error('No se pudieron cargar las categorías');
  }

  return data as Categoria[];
}

/**
 * Obtiene los productos disponibles incluyendo el nombre de su categoría.
 * Realiza un JOIN automático con la tabla 'categorias'.
 */
export async function getProducts(): Promise<Producto[]> {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*,categorias(nombre)') // Todo pegado para evitar errores de URL
      .eq('disponible', true);

    if (error) {
      console.error('Error de Supabase:', error.message);
      throw error;
    }

    return data as Producto[] || [];
  } catch (err) {
    console.error('Error en getProducts:', err);
    throw new Error('No se pudieron cargar los productos');
  }
}

export async function get4Products(): Promise<Producto[]> {
  const { data, error } = await supabase
    .from('productos')
    .select('*, categorias(nombre)')
    .eq('disponible', true)
    .limit(4); // ✅ Añade esta línea para traer solo 4 elementos

  if (error) {
    console.error('Error fetching products:', error.message);
    throw new Error('No se pudieron cargar los productos');
  }

  return data as Producto[];
}

/**
 * Obtiene productos filtrados por una categoría específica.
 * Útil para la navegación del menú.
 */
export async function getProductsByCategory(categoriaId: string): Promise<Producto[]> {
  const { data, error } = await supabase
    .from('productos')
    .select(`
      *,
      categorias (nombre)
    `)
    .eq('categoria_id', categoriaId)
    .eq('disponible', true);

  if (error) {
    console.error('Error fetching products by category:', error.message);
    throw new Error('Error al filtrar productos');
  }

  return data as Producto[];
}
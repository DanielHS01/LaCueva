"use client"; // Solo si decides manejar filtros por categoría más adelante
import { Producto } from "@/types/database";
import ProductCard from "./ProductCard";

interface FeaturedMenuProps {
  initialProducts: Producto[];
}
export default function FeaturedMenu({ initialProducts }: FeaturedMenuProps) {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Favoritos del Público
          </h2>
          <div className="w-24 h-1 bg-orange-600 mx-auto mb-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {initialProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              nombre={product.nombre}
              descripcion={product.descripcion}
              precio={product.precio}
              imagen_url={product.imagen_url}
              categoria_id={product.categoria_id}
              disponible={product.disponible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

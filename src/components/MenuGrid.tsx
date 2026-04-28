"use client";
import { useState } from "react";
import { Producto, Categoria } from "@/types/database";
import ProductCard from "./ProductCard";

interface MenuGridProps {
  products: Producto[];
  categories: Categoria[];
}

export default function MenuGrid({ products, categories }: MenuGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("todos");

  // Lógica de filtrado
  const filteredProducts =
    activeCategory === "todos"
      ? products
      : products.filter(
          (p) =>
            p.categorias?.nombre.toLowerCase() === activeCategory.toLowerCase(),
        );

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Nuestro Menú</h1>
          <div className="w-20 h-1 bg-orange-600 mx-auto mb-6 rounded-full" />
          <p className="text-gray-400 max-w-lg mx-auto">
            Descubre nuestros sabores únicos y arma tu pedido perfecto
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <button
            onClick={() => setActiveCategory("todos")}
            className={`px-6 py-2 rounded-full font-medium transition-all hover:cursor-pointer ${
              activeCategory === "todos"
                ? "bg-orange-600 text-white hover:bg-orange-700 hover:cursor-pointer"
                : "bg-neutral-800 text-gray-400 hover:bg-neutral-700"
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.nombre)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === cat.nombre
                  ? "bg-orange-600 text-white hover:bg-orange-700 hover:cursor-pointer"
                  : "bg-neutral-800 text-gray-400 hover:bg-neutral-700 hover:cursor-pointer"
              }`}
            >
              {cat.nombre}
            </button>
          ))}
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
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

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-12">
            No hay productos en esta categoría.
          </p>
        )}
      </div>
    </section>
  );
}

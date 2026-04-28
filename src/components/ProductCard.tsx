"use client";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Producto } from "@/types/database"; // Importamos la interfaz real

export default function ProductCard(product: Producto) {
  const { addToCart } = useCart();

  return (
    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-neutral-800 hover:border-orange-900/50 transition-all group">
      <div className="relative h-56 w-full">
        <Image
          src={product.imagen_url} // ✅ Usamos el nombre de la DB
          alt={product.nombre}
          width={500}
          height={500}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-orange-600 text-white font-bold px-3 py-1 rounded-full shadow-lg text-sm">
          ${product.precio.toFixed(2)}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{product.nombre}</h3>
        <p className="text-gray-400 text-sm mb-6 line-clamp-2">
          {product.descripcion}
        </p>

        <button
          className="w-full py-3 bg-[#2a1a1a] text-orange-500 font-semibold rounded-lg border hover:cursor-pointer border-orange-900/30 hover:bg-orange-600 hover:text-white transition-all flex items-center justify-center gap-2"
          onClick={() => addToCart(product)} // ✅ Ahora coinciden perfectamente
        >
          <ShoppingCart size={18} />
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

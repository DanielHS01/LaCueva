"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { useSyncExternalStore } from "react";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function FloatingCartBtn({ onClick }: { onClick: () => void }) {
  const { totalItems, totalPrice } = useCart();
  const isClient = useIsClient();

  if (!isClient || totalItems === 0) return null;
  return (
    <button
      onClick={onClick}
      className="bottom-8 right-8 z-50 flex items-center gap-3 bg-orange-600 hover:bg-orange-700 hover:cursor-pointer text-white px-6 py-4 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95"
    >
      <div className="relative">
        <ShoppingCart size={24} />
        <span className="absolute -top-2 -right-2 bg-white text-orange-600 text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-orange-600">
          {totalItems}
        </span>
      </div>
      <div className="flex flex-col items-start leading-tight">
        <span className="text-[10px] uppercase font-bold opacity-80">
          Tu Pedido
        </span>
        <span className="text-sm font-bold">${totalPrice.toFixed(2)}</span>
      </div>
    </button>
  );
}

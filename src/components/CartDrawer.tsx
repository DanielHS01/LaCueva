"use client";
import { useCart } from "@/context/CartContext";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";
import { Producto } from "@/types/database";
import { useRouter } from "next/navigation";

interface CartItem extends Producto {
  quantity: number;
}
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const {
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    totalPrice,
    totalItems,
  } = useCart();
  const router = useRouter();
  // Función para reducir cantidad (si es 1, lo elimina)
  const handleDecrease = (item: CartItem) => {
    if (item.quantity > 1) {
      decreaseQuantity(item.id);
    } else {
      removeFromCart(item.id);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay oscuro de fondo */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60 transition-opacity"
        onClick={onClose}
      />

      {/* Panel del Carrito */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#121212] border-l border-white/10 z-70 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-orange-500" />
            <h2 className="text-xl font-bold text-white">
              Tu Pedido ({totalItems})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full text-gray-400"
          >
            <X size={24} />
          </button>
        </div>

        {/* Lista de Productos */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <ShoppingBag size={64} className="mb-4" />
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            cart.map((item: CartItem) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="relative h-20 w-20 shrink-0 rounded-lg overflow-hidden border border-white/5">
                  <Image
                    src={item.imagen_url}
                    alt={item.nombre}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-bold text-white text-sm">
                      {item.nombre}
                    </h4>
                    <span className="text-orange-500 font-bold text-sm">
                      ${(item.precio * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3 bg-black/40 rounded-lg p-1 border border-white/5">
                      <button
                        onClick={() => handleDecrease(item)}
                        className="p-1 hover:text-orange-500 transition hover:cursor-pointer"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-xs font-medium w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="p-1 hover:text-orange-500 transition hover:cursor-pointer"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-500 hover:text-red-500 hover:cursor-pointer transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer con Total */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-black/20 space-y-4">
            <div className="flex justify-between items-center text-white">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-2xl font-bold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                router.push("/checkout");
              }}
              className="w-full bg-orange-600 hover:bg-orange-700 hover:cursor-pointer text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-orange-900/20"
            >
              Finalizar Pedido
            </button>
            <p className="text-[10px] text-center text-gray-500 uppercase tracking-widest">
              Envío calculado al finalizar
            </p>
          </div>
        )}
      </div>
    </>
  );
}

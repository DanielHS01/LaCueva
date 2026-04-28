"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { ShoppingBag, User, Phone, MapPin, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSyncExternalStore } from "react";
import { toast } from "sonner";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function CheckoutClient() {
  const { cart, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const isClient = useIsClient();

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    observaciones: "",
  });

  if (!isClient) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nombre || !form.telefono || !form.direccion) {
      toast.error("Por favor, completa los campos obligatorios.");
      return;
    }

    setLoading(true);

    // 2. Usar toast.promise para una experiencia premium
    toast.promise(
      async () => {
        const res = await fetch("/api/pedidos", {
          method: "POST",
          body: JSON.stringify({
            ...form,
            total: totalPrice,
            items: cart,
          }),
        });

        if (!res.ok) throw new Error("Error al crear pedido");

        // Pequeña pausa opcional para que el usuario vea el éxito antes de redirigir
        await new Promise((resolve) => setTimeout(resolve, 1500));

        clearCart();
        window.location.href = "/";
      },
      {
        loading: "Procesando tu pedido...",
        success: "¡Pedido enviado con éxito! Redirigiendo...",
        error: (err: { message: unknown }) => `${err.message}`,
      },
    );

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/menu"
          className="inline-flex items-center text-orange-500 hover:text-orange-400 mb-8 transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Volver al menú</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Columna Izquierda: Formulario */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Finalizar Pedido</h1>
              <p className="text-gray-400">
                Ingresa tus datos para la entrega.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  size={20}
                />
                <input
                  required
                  placeholder="Nombre completo"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                />
              </div>

              <div className="relative">
                <Phone
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  size={20}
                />
                <input
                  required
                  type="tel"
                  placeholder="Teléfono de contacto"
                  value={form.telefono}
                  onChange={(e) =>
                    setForm({ ...form, telefono: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                />
              </div>

              <div className="relative">
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  size={20}
                />
                <input
                  required
                  placeholder="Dirección exacta (Barrio, calle, apto)"
                  value={form.direccion}
                  onChange={(e) =>
                    setForm({ ...form, direccion: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                />
              </div>

              <textarea
                placeholder="Notas adicionales (Ej: El timbre no sirve, sin cebolla...)"
                rows={3}
                value={form.observaciones}
                onChange={(e) =>
                  setForm({ ...form, observaciones: e.target.value })
                }
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all resize-none"
              />

              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className="w-full bg-orange-600 hover:bg-orange-700 hover:cursor-pointer disabled:opacity-50 disabled:hover:bg-orange-600 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-orange-900/20 transition-all flex items-center justify-center gap-2"
              >
                {loading
                  ? "Procesando..."
                  : `Confirmar Pedido • $${totalPrice.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Columna Derecha: Resumen del Carrito */}
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10 h-fit lg:sticky lg:top-8">
            <div className="flex items-center gap-3 mb-6">
              <ShoppingBag className="text-orange-500" />
              <h2 className="text-xl font-bold">Resumen de cuenta</h2>
            </div>

            <div className="space-y-4 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0"
                >
                  <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-black/40">
                    <Image
                      src={item.imagen_url}
                      alt={item.nombre}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">{item.nombre}</h4>
                    <p className="text-gray-400 text-xs">
                      Cant: {item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-orange-500">
                    ${(item.precio * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Envío</span>
                <span className="text-green-500">Calculado por zona</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-2 border-t border-white/5">
                <span>Total a pagar</span>
                <span className="text-orange-500">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

type Pedido = {
  id: number;
  total: number;
  estado: string;
  created_at: string;
  direccion_entrega: string;

  items_pedido: {
    cantidad: number;

    productos: {
      nombre: string;
    } | null;
  }[];
};

export default function SeguimientoPage() {
  const [telefono, setTelefono] = useState("");

  const [loading, setLoading] = useState(false);

  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const buscarPedidos = async () => {
    if (!telefono.trim()) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/pedidos/telefono/${telefono}`);

      const data = await res.json();

      setPedidos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getEstadoStyles = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";

      case "preparando":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";

      case "enviado":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";

      case "entregado":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";

      case "cancelado":
        return "bg-red-500/10 text-red-500 border-red-500/20";

      default:
        return "bg-zinc-500/10 text-zinc-500 border-zinc-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-32">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-black mb-4">Seguimiento de Pedido</h1>

          <p className="text-gray-400 text-lg">
            Consulta el estado de tus pedidos
          </p>
        </div>

        {/* BUSCADOR */}
        <div
          className="
            bg-[#161616]
            border border-white/5
            rounded-3xl
            p-6
            mb-10
          "
        >
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Ingresa tu número de teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="
                flex-1
                bg-black
                border border-white/10
                rounded-2xl
                px-5 py-4
                outline-none
              "
            />

            <button
              onClick={buscarPedidos}
              className="
                bg-orange-500
                hover:bg-orange-600
                transition
                rounded-2xl
                px-8 py-4
                font-bold
              "
            >
              Buscar
            </button>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center text-gray-400">Buscando pedidos...</div>
        )}

        {/* SIN PEDIDOS */}
        {!loading && telefono && pedidos.length === 0 && (
          <div
            className="
                bg-[#161616]
                border border-white/5
                rounded-3xl
                p-10
                text-center
              "
          >
            <p className="text-gray-400">
              No encontramos pedidos asociados a ese número.
            </p>
          </div>
        )}

        {/* PEDIDOS */}
        <div className="space-y-6">
          {pedidos.map((pedido) => (
            <div
              key={pedido.id}
              className="
                bg-[#161616]
                border border-white/5
                rounded-3xl
                p-8
              "
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    Pedido #{pedido.id}
                  </h2>

                  <p className="text-gray-500">
                    {new Date(pedido.created_at).toLocaleString()}
                  </p>
                </div>

                <div
                  className={`
                    px-4 py-2
                    rounded-full
                    border
                    text-sm
                    font-semibold
                    uppercase
                    ${getEstadoStyles(pedido.estado)}
                  `}
                >
                  {pedido.estado}
                </div>
              </div>

              {/* PRODUCTOS */}
              <div className="mb-6">
                <p className="text-gray-400 mb-3">Productos</p>

                <div className="space-y-2">
                  {pedido.items_pedido.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>
                        {item.cantidad}x {item.productos?.nombre}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DIRECCIÓN */}
              <div className="mb-6">
                <p className="text-gray-400 mb-2">Dirección de entrega</p>

                <p>{pedido.direccion_entrega}</p>
              </div>

              {/* TOTAL */}
              <div className="flex justify-between items-center border-t border-white/5 pt-6">
                <span className="text-gray-400">Total</span>

                <span className="text-3xl font-black text-orange-500">
                  ${pedido.total.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

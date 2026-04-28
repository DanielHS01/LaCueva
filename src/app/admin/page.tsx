"use client";

import { useEffect, useState } from "react";
import { Package, DollarSign, Clock, TrendingUp } from "lucide-react";

type Pedido = {
  id: number;
  cliente_nombre: string;
  cliente_telefono: string;
  direccion_entrega: string;
  total: number;
  estado: string;
  created_at: string;
  observaciones: string | null;
  items_pedido: {
    cantidad: number;
    productos: {
      nombre: string;
    } | null;
  }[];
};

export default function AdminPanel() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPedidos = async () => {
    try {
      const res = await fetch("/api/admin/pedidos");
      const data = await res.json();
      setPedidos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/pedidos");
        const data = await res.json();
        setPedidos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const cambiarEstado = async (id: number, estado: string) => {
    try {
      await fetch(`/api/admin/pedidos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado }),
      });

      fetchPedidos();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 Stats dinámicos
  const pedidosHoy = pedidos.filter(
    (p) => new Date(p.created_at).toDateString() === new Date().toDateString(),
  );

  const ingresosHoy = pedidosHoy.reduce((acc, p) => acc + p.total, 0);

  const stats = [
    {
      label: "Pedidos Hoy",
      value: pedidosHoy.length,
      icon: <Package className="text-orange-500" />,
    },
    {
      label: "Ingresos Hoy",
      value: `$${ingresosHoy.toFixed(2)}`,
      icon: <DollarSign className="text-orange-500" />,
    },
    {
      label: "Pendientes",
      value: pedidos.filter((p) => p.estado === "pendiente").length,
      icon: <Clock className="text-orange-500" />,
    },
    {
      label: "Ticket Promedio",
      value:
        pedidosHoy.length > 0
          ? `$${(ingresosHoy / pedidosHoy.length).toFixed(2)}`
          : "$0",
      icon: <TrendingUp className="text-green-500" />,
    },
  ];

  if (loading) {
    return <p className="text-white p-8">Cargando...</p>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-2">Panel Administrativo</h1>
        <p className="text-gray-400">Gestiona tus pedidos en tiempo real</p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-[#161616] p-6 rounded-2xl border border-white/10 flex flex-col justify-between h-40"
          >
            <div className="flex justify-between items-start">
              <div className="p-3 bg-white/5 rounded-xl">{stat.icon}</div>
              <span className="text-3xl font-bold">{stat.value}</span>
            </div>
            <p className="text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabla */}
      <section className="bg-[#161616] rounded-3xl border border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5">
          <h2 className="text-2xl font-bold">Pedidos Recientes</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-8 py-6">ID</th>
                <th className="px-8 py-6">Cliente</th>
                <th className="px-8 py-6">Productos</th>
                <th className="px-8 py-6">Total</th>
                <th className="px-8 py-6">Estado</th>
                <th className="px-8 py-6">Hora</th>
                <th className="px-8 py-6">Observaciones</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {pedidos.map((pedido) => (
                <tr key={pedido.id} className="hover:bg-white/5">
                  <td className="px-8 py-6 font-bold">#{pedido.id}</td>

                  <td className="px-8 py-6">
                    <div className="font-bold">{pedido.cliente_nombre}</div>
                    <div className="text-xs text-gray-500">
                      {pedido.cliente_telefono}
                    </div>
                    <div className="text-xs text-gray-400 italic">
                      {pedido.direccion_entrega}
                    </div>
                  </td>

                  <td className="px-8 py-6 text-sm text-gray-300">
                    {pedido.items_pedido.map((i, idx) => (
                      <div key={idx}>
                        {i.cantidad}x{" "}
                        {i.productos?.nombre || "Producto eliminado"}
                      </div>
                    ))}
                  </td>

                  <td className="px-8 py-6 font-bold text-orange-500">
                    ${pedido.total.toFixed(2)}
                  </td>

                  <td className="px-8 py-6">
                    <button
                      onClick={() => cambiarEstado(pedido.id, "preparando")}
                      className="px-3 py-1 rounded-full text-xs bg-orange-500/10 text-orange-500 hover:cursor-pointer hover:bg-orange-500/20 transition"
                    >
                      {pedido.estado}
                    </button>
                  </td>

                  <td className="px-8 py-6 text-sm text-gray-500">
                    {new Date(pedido.created_at).toLocaleTimeString()}
                  </td>

                  <td className="px-8 py-6">
                    <span className="flex items-center gap-2  px-4 py-2 rounded-xl text-sm text-white">
                      {pedido.observaciones
                        ? pedido.observaciones
                        : "Sin Observaciones"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

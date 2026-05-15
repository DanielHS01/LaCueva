"use client";

import { EstadoPedido, Pedido } from "@/types/pedidos";
import { ChevronDown, Clock, MapPin, Phone, User } from "lucide-react";

type Props = {
  pedidos: Pedido[];
  cambiarEstado: (id: number, estado: EstadoPedido) => void;
};

export default function PedidosTable({ pedidos, cambiarEstado }: Props) {
  const getStatusStyles = (estado: EstadoPedido) => {
    const styles: Record<EstadoPedido, string> = {
      pendiente: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      preparando: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      enviado: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      entregado: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    };
    return styles[estado];
  };

  return (
    <section className="bg-[#161616] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
      <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/1">
        <h2 className="text-xl font-bold tracking-tight">Pedidos Recientes</h2>
        <span className="px-4 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-zinc-500 border border-white/5">
          {pedidos.length} Órdenes
        </span>
      </div>

      <div className="overflow-x-auto">
        {/* VISTA PC: Tabla elegante */}
        <table className="w-full text-left hidden md:table">
          <thead className="text-zinc-500 uppercase text-[10px] font-bold tracking-[0.15em] bg-black/20">
            <tr>
              <th className="px-8 py-5">ID</th>
              <th className="px-8 py-5">Cliente / Dirección</th>
              <th className="px-8 py-5">Productos</th>
              <th className="px-8 py-5">Total</th>
              <th className="px-8 py-5">Estado</th>
              <th className="px-8 py-5 text-right">Hora</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/3">
            {pedidos.map((pedido) => (
              <tr
                key={pedido.id}
                className="hover:bg-white/2 transition-colors group"
              >
                <td className="px-8 py-6 font-mono text-orange-500 font-bold text-sm">
                  #{pedido.id}
                </td>

                <td className="px-8 py-6 max-w-70">
                  <div className="flex flex-col gap-1">
                    <div className="font-bold text-zinc-100 flex items-center md:gap-2">
                      <User size={14} className="text-zinc-500" />
                      {pedido.cliente_nombre}
                    </div>
                    <div className="text-xs text-zinc-500 flex items-center md:gap-2">
                      <Phone size={12} /> {pedido.cliente_telefono}
                    </div>
                    <div className="text-[11px] text-zinc-500 flex items-center gap-2 italic leading-tight mt-1">
                      <MapPin size={12} className="text-orange-500/50" />
                      {pedido.direccion_entrega}
                    </div>
                  </div>
                </td>

                <td className="px-8 py-6">
                  <div className="space-y-1">
                    {pedido.items_pedido.map((i, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-zinc-300 flex items-center gap-2"
                      >
                        <span className="w-5 h-5 flex items-center justify-center bg-white/5 rounded font-bold text-[10px] text-orange-500">
                          {i.cantidad}
                        </span>
                        {i.productos?.nombre}
                      </div>
                    ))}
                  </div>
                  {pedido.observaciones && (
                    <p className="text-[10px] text-orange-500/60 mt-2 bg-orange-500/5 px-2 py-1 rounded border border-orange-500/10 w-fit">
                      `{pedido.observaciones}`
                    </p>
                  )}
                </td>

                <td className="px-8 py-6">
                  <span className="font-black text-orange-500 text-lg">
                    ${pedido.total.toLocaleString()}
                  </span>
                </td>

                <td className="px-8 py-6">
                  <div className="relative w-fit group/select">
                    <select
                      value={pedido.estado}
                      onChange={(e) =>
                        cambiarEstado(pedido.id, e.target.value as EstadoPedido)
                      }
                      className={`
                        pl-4 pr-10 py-2 rounded-xl text-[10px]
                        font-black tracking-widest uppercase
                        border transition-all duration-300
                        outline-none appearance-none cursor-pointer
                        scheme-dark
                        ${getStatusStyles(pedido.estado)}
                      `}
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="preparando">Preparando</option>
                      <option value="enviado">Enviado</option>
                      <option value="entregado">Entregado</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 group-hover/select:opacity-100 transition-opacity"
                    />
                  </div>
                </td>

                <td className="px-8 py-6 text-right">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5 text-zinc-400 text-sm font-medium">
                      <Clock size={14} />
                      {new Date(pedido.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <span className="text-[10px] text-zinc-600 font-bold uppercase mt-1">
                      Hoy
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* VISTA MÓVIL: Cards para no romper el layout */}
        <div className="md:hidden divide-y divide-white/5">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-orange-500 font-mono font-bold text-xs">
                    #{pedido.id}
                  </span>
                  <h3 className="font-bold text-lg text-white">
                    {pedido.cliente_nombre}
                  </h3>
                </div>
                <span className="font-black text-orange-500">
                  ${pedido.total.toLocaleString()}
                </span>
              </div>

              <div className="text-xs text-zinc-500 bg-white/5 p-3 rounded-2xl border border-white/5">
                {pedido.items_pedido.map((i, idx) => (
                  <p key={idx}>
                    <span className="text-orange-500 font-bold">
                      {i.cantidad}x
                    </span>{" "}
                    {i.productos?.nombre}
                  </p>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="text-[10px] text-zinc-500 flex items-center gap-1">
                  <Clock size={12} />{" "}
                  {new Date(pedido.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <select
                  value={pedido.estado}
                  onChange={(e) =>
                    cambiarEstado(pedido.id, e.target.value as EstadoPedido)
                  }
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase border appearance-none ${getStatusStyles(pedido.estado)}`}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="preparando">Preparando</option>
                  <option value="enviado">Enviado</option>
                  <option value="entregado">Entregado</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

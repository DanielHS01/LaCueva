"use client";

import { useMemo, useState } from "react";
import { Pedido } from "@/types/pedidos";
import {
  Filter,
  TrendingUp,
  Package,
  DollarSign,
  ChevronDown,
} from "lucide-react";

type Props = {
  pedidos: Pedido[];
};

export default function VentasView({ pedidos }: Props) {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("todos");

  const pedidosFiltrados = useMemo(() => {
    return pedidos.filter((pedido) => {
      const fechaPedido = new Date(pedido.created_at);
      if (fechaInicio) {
        const inicio = new Date(fechaInicio);
        inicio.setHours(0, 0, 0, 0);
        if (fechaPedido < inicio) return false;
      }
      if (fechaFin) {
        const fin = new Date(fechaFin);
        fin.setHours(23, 59, 59, 999);
        if (fechaPedido > fin) return false;
      }
      if (estadoFiltro !== "todos" && pedido.estado !== estadoFiltro)
        return false;
      return true;
    });
  }, [pedidos, fechaInicio, fechaFin, estadoFiltro]);

  const totalVentas = pedidosFiltrados.reduce((acc, p) => acc + p.total, 0);
  const ticketPromedio =
    pedidosFiltrados.length > 0 ? totalVentas / pedidosFiltrados.length : 0;

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* SECCIÓN DE FILTROS */}
      <div className="bg-[#161616] border border-white/5 rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center gap-2 mb-6 text-orange-500">
          <Filter size={20} />
          <h2 className="text-xl font-bold text-white">Panel de Filtros</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="flex flex-col gap-2 relative">
            <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 ml-1">
              Desde
            </label>
            <div className="relative group">
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="
        w-full bg-black border border-white/10 rounded-2xl px-4 py-3 
        outline-none focus:border-orange-500/50 transition-all 
        text-sm text-white cursor-pointer
        hover:bg-white/2 hover:border-white/20
        scheme-dark
      "
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 ml-1">
              Hasta
            </label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 
        outline-none focus:border-orange-500/50 transition-all 
        text-sm text-white cursor-pointer
        hover:bg-white/2 hover:border-white/20
        scheme-dark"
            />
          </div>

          <div className="flex flex-col gap-2 relative">
            <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 ml-1">
              Estado del Pedido
            </label>
            <div className="relative group">
              <select
                value={estadoFiltro}
                onChange={(e) => setEstadoFiltro(e.target.value)}
                className="
        w-full bg-black border border-white/10 rounded-2xl px-4 py-3 
        outline-none focus:border-orange-500/50 transition-all 
        text-sm text-white cursor-pointer appearance-none
        hover:bg-white/2 hover:border-white/20
      "
              >
                <option value="todos" className="bg-[#121212]">
                  Todos los estados
                </option>
                <option value="pendiente" className="bg-[#121212]">
                  Pendiente
                </option>
                <option value="preparando" className="bg-[#121212]">
                  Preparando
                </option>
                <option value="enviado" className="bg-[#121212]">
                  Enviado
                </option>
                <option value="entregado" className="bg-[#121212]">
                  Entregado
                </option>
              </select>

              {/* Flecha personalizada */}
              <ChevronDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 group-hover:text-orange-500 pointer-events-none transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* STATS RESPONSIVAS (Grid de 2 o 3 columnas) */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-[#161616] p-5 rounded-3xl border border-white/5 flex flex-col items-center text-center">
          <div className="bg-orange-500/10 p-3 rounded-2xl mb-3 text-orange-500">
            <DollarSign size={20} />
          </div>
          <span className="text-xl lg:text-2xl font-black text-orange-500">
            ${totalVentas.toLocaleString()}
          </span>
          <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mt-1">
            Total Ventas
          </p>
        </div>

        <div className="bg-[#161616] p-5 rounded-3xl border border-white/5 flex flex-col items-center text-center">
          <div className="bg-blue-500/10 p-3 rounded-2xl mb-3 text-blue-500">
            <Package size={20} />
          </div>
          <span className="text-xl lg:text-2xl font-black text-white">
            {pedidosFiltrados.length}
          </span>
          <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mt-1">
            Pedidos
          </p>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-[#161616] p-5 rounded-3xl border border-white/5 flex flex-col items-center text-center">
          <div className="bg-emerald-500/10 p-3 rounded-2xl mb-3 text-emerald-500">
            <TrendingUp size={20} />
          </div>
          <span className="text-xl lg:text-2xl font-black text-white">
            ${ticketPromedio.toLocaleString()}
          </span>
          <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mt-1">
            Ticket Promedio
          </p>
        </div>
      </div>

      {/* LISTADO DE PEDIDOS (Tabla en PC, Cards en Móvil) */}
      <section className="bg-[#161616] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 bg-white/2">
          <h2 className="text-lg font-bold">Detalle de Operaciones</h2>
        </div>

        {/* VISTA TABLET/PC */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest bg-black/20">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/3">
              {pedidosFiltrados.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-white/2 transition-colors group"
                >
                  <td className="px-6 py-5 font-mono text-orange-500 text-sm">
                    #{p.id.toString().slice(-4)}
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-bold text-sm text-zinc-200">
                      {p.cliente_nombre}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {p.cliente_telefono}
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-white/5 border border-white/10">
                      {p.estado}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm text-zinc-400">
                    {new Date(p.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-5 text-right font-black text-orange-500">
                    ${p.total.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* VISTA MÓVIL (Cards) */}
        <div className="md:hidden divide-y divide-white/5">
          {pedidosFiltrados.map((p) => (
            <div
              key={p.id}
              className="p-5 flex justify-between items-center active:bg-white/5 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-orange-500 font-mono text-xs font-bold">
                    #{p.id.toString().slice(-4)}
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded-md bg-white/5 text-zinc-400 uppercase font-bold tracking-tighter">
                    {p.estado}
                  </span>
                </div>
                <p className="font-bold text-sm">{p.cliente_nombre}</p>
                <p className="text-[11px] text-zinc-500">
                  {new Date(p.created_at).toLocaleTimeString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-black text-orange-500">
                  ${p.total.toLocaleString()}
                </p>
                <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-tighter">
                  Total
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

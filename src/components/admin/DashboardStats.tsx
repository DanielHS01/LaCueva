"use client";

import { Package, DollarSign, Clock, TrendingUp } from "lucide-react";

import { Pedido } from "@/types/pedidos";

type Props = {
  pedidos: Pedido[];
};

export default function DashboardStats({ pedidos }: Props) {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="
            bg-[#161616]
            p-6 rounded-2xl
            border border-white/10
            flex flex-col justify-between
            h-40
          "
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-white/5 rounded-xl">{stat.icon}</div>

            <span className="text-3xl font-bold">{stat.value}</span>
          </div>

          <p className="text-gray-500">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

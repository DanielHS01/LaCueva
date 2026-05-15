"use client";

import {
  LayoutDashboard,
  BarChart3,
  UtensilsCrossed,
  ShoppingBag,
} from "lucide-react";

type Props = {
  activeView: string;
  setActiveView: (view: string) => void;
};

const items = [
  { id: "domicilios", label: "Domicilios", icon: LayoutDashboard },
  { id: "ventas", label: "Ventas", icon: BarChart3 },
  { id: "mesa", label: "Órdenes de Mesa", icon: UtensilsCrossed },
  { id: "llevar", label: "Para Llevar", icon: ShoppingBag },
];

export default function Sidebar({ activeView, setActiveView }: Props) {
  return (
    <>
      {/* BARRA LATERAL (Escritorio: lg) */}
      <aside
        className="
          hidden lg:flex flex-col
    fixed left-0 top-16 
    w-64 h-[calc(100vh-64px)] /* Ocupa el alto restante tras el nav */
    bg-[#0a0a0a]
    border-r border-white/5
    p-4 z-30 /* Bajamos el z-index un poco */
    md:mt-10
        "
      >
        <nav className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`
                  w-full flex items-center gap-3
                  px-4 py-3 rounded-xl
                  text-sm font-medium
                  transition-all duration-200
                  group
                  ${
                    active
                      ? "bg-orange-500 text-black shadow-lg shadow-orange-500/10"
                      : "text-zinc-500 hover:bg-white/3 hover:text-white"
                  }
                `}
              >
                <Icon
                  size={18}
                  className={
                    active
                      ? "text-black"
                      : "text-zinc-500 group-hover:text-orange-500"
                  }
                />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* BARRA INFERIOR (Móvil/Tablet: < lg) */}
      <nav
        className="
          lg:hidden
          fixed bottom-0 left-0 right-0
          h-16 bg-[#0d0d0d]/80 backdrop-blur-md
          border-t border-white/5
          flex justify-around items-center
          px-2 z-50
        "
      >
        {items.map((item) => {
          const Icon = item.icon;
          const active = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`
                flex flex-col items-center justify-center gap-1
                flex-1 py-2 rounded-lg transition-all
                ${active ? "text-orange-500" : "text-zinc-500"}
              `}
            >
              <Icon size={20} />
              <span className="text-[10px] font-bold uppercase tracking-tighter">
                {item.id === "domicilios" ? "Domi" : item.label.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

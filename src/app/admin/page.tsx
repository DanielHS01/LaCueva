"use client";

import { useEffect, useState, useCallback, startTransition } from "react";

import Sidebar from "@/components/admin/Sidebar";
import PedidosTable from "@/components/admin/PedidosTable";
import VentasView from "@/components/admin/VentasView";
import PlaceholderView from "@/components/admin/PlaceholderView";

import { EstadoPedido, Pedido } from "@/types/pedidos";

import { supabase } from "@/lib/supabase";

import { toast } from "sonner";

export default function AdminPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const [loading, setLoading] = useState(true);

  const [activeView, setActiveView] = useState("domicilios");

  const fetchPedidos = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/pedidos");

      if (!res.ok) {
        throw new Error("Error obteniendo pedidos");
      }

      const data: Pedido[] = await res.json();

      startTransition(() => {
        setPedidos(data);
      });
    } catch (err) {
      console.error(err);

      toast.error("Error cargando pedidos");
    } finally {
      startTransition(() => {
        setLoading(false);
      });
    }
  }, []);

  // CARGA INICIAL
  useEffect(() => {
    void fetchPedidos();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // REALTIME
  useEffect(() => {
    const channel = supabase
      .channel("pedidos-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "pedidos",
        },
        async (payload) => {
          console.log(payload);

          // INSERT
          if (payload.eventType === "INSERT") {
            toast.success("Nuevo pedido recibido 🍗");

            await fetchPedidos();

            return;
          }

          // UPDATE
          if (payload.eventType === "UPDATE") {
            startTransition(() => {
              setPedidos((prev) =>
                prev.map((pedido) =>
                  pedido.id === payload.new.id
                    ? {
                        ...pedido,
                        ...(payload.new as Pedido),
                      }
                    : pedido,
                ),
              );
            });

            return;
          }

          // DELETE
          if (payload.eventType === "DELETE") {
            startTransition(() => {
              setPedidos((prev) =>
                prev.filter((pedido) => pedido.id !== payload.old.id),
              );
            });
          }
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [fetchPedidos]);

  const cambiarEstado = async (id: number, estado: EstadoPedido) => {
    try {
      const res = await fetch(`/api/admin/pedidos/${id}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          estado,
        }),
      });

      if (!res.ok) {
        throw new Error("No se pudo actualizar");
      }

      startTransition(() => {
        setPedidos((prev) =>
          prev.map((pedido) =>
            pedido.id === id
              ? {
                  ...pedido,
                  estado,
                }
              : pedido,
          ),
        );
      });
    } catch (err) {
      console.error(err);

      toast.error("Error actualizando pedido");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-zinc-400">Cargando pedidos...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      <main
        className="
          min-h-screen
          bg-black
          pt-20
          pb-24
          lg:pb-4
          lg:pl-64
          px-4
          transition-all
          ml-5
        "
      >
        <header className="mb-10 mt-10">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>

          <p className="text-gray-400">Gestiona tu restaurante</p>
        </header>

        {activeView === "domicilios" && (
          <PedidosTable pedidos={pedidos} cambiarEstado={cambiarEstado} />
        )}

        {activeView === "ventas" && <VentasView pedidos={pedidos} />}

        {activeView === "mesa" && <PlaceholderView title="Órdenes de Mesa" />}

        {activeView === "llevar" && <PlaceholderView title="Para Llevar" />}
      </main>
    </div>
  );
}

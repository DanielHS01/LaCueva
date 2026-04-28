// app/api/admin/pedidos/route.ts

import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    // 🔥 Validar envs (esto evita crashes silenciosos)
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      throw new Error("Falta NEXT_PUBLIC_SUPABASE_URL");
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY");
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabase
      .from("pedidos")
      .select(`
        id,
        cliente_nombre,
        cliente_telefono,
        direccion_entrega,
        total,
        estado,
        created_at,
        observaciones,
        items_pedido (
          cantidad,
          productos (
            nombre
          )
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("SUPABASE ERROR:", error);

      return new Response(
        JSON.stringify({ error: error.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify(data ?? []), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err: unknown) {
    console.error("API ERROR:", err);

    return new Response(
      JSON.stringify({
        error: (err as Error).message || "Error interno del servidor",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
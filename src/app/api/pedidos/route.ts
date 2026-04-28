// app/api/pedidos/route.ts

import { createClient } from "@supabase/supabase-js";

// ✅ Tipos
type CartItemDTO = {
  id: number;
  quantity: number;
  precio: number;
};

type CreatePedidoBody = {
  nombre: string;
  telefono: string;
  direccion: string;
  observaciones?: string;
  total: number;
  items: CartItemDTO[];
};

export async function POST(req: Request) {
  try {
    const body: CreatePedidoBody = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // ✅ 1. Insertar pedido
    const { data: pedido, error } = await supabase
      .from("pedidos")
      .insert({
        cliente_nombre: body.nombre,
        cliente_telefono: body.telefono,
        direccion_entrega: body.direccion,
        total: body.total,
        observaciones: body.observaciones,
      })
      .select()
      .single();

    if (error || !pedido) {
      return new Response(
        JSON.stringify({ error: "Error al crear pedido" }),
        { status: 500 }
      );
    }

    // ✅ 2. Insertar items del pedido
    const items = body.items.map((item) => ({
      pedido_id: pedido.id,
      producto_id: item.id,
      cantidad: item.quantity,
      precio_unitario: item.precio,
    }));

    const { error: itemsError } = await supabase
      .from("items_pedido")
      .insert(items);

    if (itemsError) {
      return new Response(
        JSON.stringify({ error: "Error al insertar items" }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ ok: true, pedidoId: pedido.id }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({ error: "Error inesperado en el servidor" }),
      { status: 500 }
    );
  }
}
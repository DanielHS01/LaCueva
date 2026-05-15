import { createClient } from "@supabase/supabase-js";

type Context = {
  params: Promise<{
    telefono: string;
  }>;
};

export async function GET(
  req: Request,
  context: Context
) {
  try {
    const { telefono } = await context.params;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from("pedidos")
      .select(`
        id,
        total,
        estado,
        created_at,
        direccion_entrega,
        observaciones,
        items_pedido (
          cantidad,
          productos (
            nombre
          )
        )
      `)
      .eq("cliente_telefono", telefono)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      return Response.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return Response.json(data);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Error interno",
      },
      {
        status: 500,
      }
    );
  }
}
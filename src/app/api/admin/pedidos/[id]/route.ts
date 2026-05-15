import { createClient } from "@supabase/supabase-js";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { estado } = await req.json();
    const { id } = await context.params; // 👈 FIX

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase
      .from("pedidos")
      .update({ estado })
      .eq("id", Number(id)); // 👈 mejor castearlo

    if (error) {
  console.error("SUPABASE ERROR:", error); // 👈 CLAVE
  return new Response(JSON.stringify({ error: error.message }), {
    status: 500,
  });
}

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });

  } catch (err: unknown) {
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Error interno",
      }),
      { status: 500 }
    );
  }
}
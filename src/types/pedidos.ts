export type EstadoPedido =
  | "pendiente"
  | "preparando"
  | "enviado"
  | "entregado";

export type Pedido = {
  id: number;
  cliente_nombre: string;
  cliente_telefono: string;
  direccion_entrega: string;
  total: number;
  estado: EstadoPedido;
  created_at: string;
  observaciones: string | null;

  items_pedido: {
    cantidad: number;

    productos: {
      nombre: string;
    } | null;
  }[];
};
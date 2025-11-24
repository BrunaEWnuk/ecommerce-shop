import { supabase } from "@/lib/client";
import type { CartItem } from "@/cases/cart/contexts/cartContext";

export async function createOrder(customerId: string, items: CartItem[]) {
    const total = items.reduce((acc, item) => {
        return acc + (Number(item.product.price) * item.quantity);
    }, 0);

    const { data: order, error: orderError } = await supabase
        .from("order")
        .insert({
            customerId: customerId,
            total: total,
            shipping: 0,
            status: "Aguardando faturamento",
        })
        .select()
        .single();

    if (orderError) {
        throw new Error(orderError.message);
    }

    const orderItems = items.map((item) => ({
        orderId: order.id,
        productId: item.product.id,
        quantity: item.quantity,
        value: Number(item.product.price),
    }));

    const { error: itemsError } = await supabase
        .from("OrderItem")
        .insert(orderItems);

    if (itemsError) {
        throw new Error(itemsError.message);
    }

    return order;
}

export async function listOrdersByCustomer(customerId: string) {
  const { data, error } = await supabase
    .from("Order")
    .select(`
      id,
      total,
      status,
      shipping,
      createdAt,
      OrderItem (
        productId,
        quantity,
        value
      )
    `)
    .eq("customerId", customerId)
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Erro ao carregar pedidos:", error);
    throw error;
  }

  return data;
}

export async function hasPurchased(customerId: string, productId: string) {
  const { data } = await supabase
    .from("OrderItem")
    .select(`
      orderId,
      Order!inner(customerId)
    `)
    .eq("productId", productId)
    .eq("Order.customerId", customerId);

  return !!data && data.length > 0;
}

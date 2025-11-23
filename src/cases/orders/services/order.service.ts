import { supabase } from "@/lib/client";
import type{ CartItem } from "@/cases/cart/contexts/cartContext";

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
            status: "Aguardando faturamento"
        })
        .select()
        .single();

    if (orderError) {
        console.error("Erro ao criar pedido:", orderError);
        throw new Error(orderError.message);
    }

    const orderItems = items.map((item) => ({
        orderId: order.id,
        productId: item.product.id, 
        quantity: item.quantity,
        value: Number(item.product.price)
    }));

    const { error: itemsError } = await supabase
        .from("OrderItem")
        .insert(orderItems);

    if (itemsError) {
        console.error("Erro ao salvar itens:", itemsError);
        throw new Error(itemsError.message);
    }

    return order;
}
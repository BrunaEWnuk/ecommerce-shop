/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { listOrdersByCustomer } from "../services/order.service";
import { useAuth } from "@/cases/costumers/contexts/AuthContext";

export function useOrder() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    async function load() {
      setLoading(true);
      try {
        const result = await listOrdersByCustomer(user.id);
        setOrders(result ?? []);
      } catch (e) {
        console.error("Erro ao carregar pedidos:", e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user]);

  return { orders, loading };
}

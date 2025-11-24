/* eslint-disable @typescript-eslint/no-explicit-any */
import { Clock, Package, CheckCircle } from "lucide-react";
import { useOrder } from "@/cases/orders/hooks/useOrder";
import ProductRating from "@/cases/products/components/ProductRating";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";

export function OrderHistoryPage() {
  const { orders, loading } = useOrder();

  return (
    <div className="p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Meus Pedidos</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="py-8">
        {loading ? (
          <p>Carregando pedidos...</p>
        ) : orders.length === 0 ? (
          <p>Você ainda não realizou pedidos.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function OrderCard({ order }: any) {
  const formatStatus = (status: string) => {
    switch (status) {
      case "Aguardando faturamento":
        return (
          <span className="flex items-center gap-1 text-yellow-600">
            <Clock size={16} /> Aguardando faturamento
          </span>
        );

      case "Em separação":
        return (
          <span className="flex items-center gap-1 text-blue-600">
            <Package size={16} /> Em separação
          </span>
        );

      case "Entregue":
        return (
          <span className="flex items-center gap-1 text-green-600">
            <CheckCircle size={16} /> Entregue
          </span>
        );

      default:
        return status;
    }
  };

  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">Pedido #{order.id}</h2>

        <span className="text-sm px-2 py-1 rounded bg-gray-100">
          {formatStatus(order.status)}
        </span>
      </div>

      <p className="text-sm text-muted-foreground mt-1">
        Realizado em {new Date(order.createdAt).toLocaleDateString()}
      </p>

      <div className="mt-3">
        <strong>Itens:</strong>
        <ul className="list-disc pl-5 space-y-2">
          {order.OrderItem?.map((item: any, index: number) => (
            <li key={index}>
              {item.quantity}x — R${item.value.toFixed(2)}

              <div className="mt-1">
                <ProductRating productId={item.productId} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 font-semibold">
        Total: R${order.total.toFixed(2)}
      </div>
    </div>
  );
}

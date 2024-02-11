import type { OrderdColumn } from "./components/columns";

import { format } from "date-fns";

import { getAllOrdersByStoreId } from "@/actions/order/find-order";
import { formatter } from "@/lib/utils";

import { OrderClient } from "./components/client";

interface OrdersPageProps {
  params: {
    storeId: string;
  };
}

export default async function OrdersPage({ params }: OrdersPageProps) {
  const { storeId } = params;
  const orders = await getAllOrdersByStoreId(storeId);

  const formattedOrders: OrderdColumn[] =
    orders?.map((order) => ({
      id: order.id,
      phone: order.phone,
      address: order.address,
      products: order.orderItems.map((item) => item.product.name).join(", "),
      totalPrice: formatter.format(
        order.orderItems.reduce((acc, item) => {
          return acc + +item.product.price;
        }, 0),
      ),
      isPaid: order.isPaid,
      createAt: format(order.createdAt, "MMMM do, yyyy"),
    })) ?? [];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
}

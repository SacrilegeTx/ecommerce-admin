"use server";

import prisma from "@/lib/prisma";

export const getTotalRevenue = async (storeId: string) => {
  try {
    const paidOrders = await prisma.order.findMany({
      where: {
        storeId,
        isPaid: true,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    const totalRevenue = paidOrders.reduce((acc, order) => {
      const orderTotal = order.orderItems.reduce((acc, orderItem) => {
        return acc + +orderItem.product.price;
      }, 0);

      return acc + orderTotal;
    }, 0);

    return totalRevenue;
  } catch (error) {
    console.error(error);

    return null;
  }
};

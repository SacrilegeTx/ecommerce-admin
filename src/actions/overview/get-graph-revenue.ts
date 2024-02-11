"use server";

import prisma from "@/lib/prisma";

interface GraphRevenue {
  name: string;
  revenue: number;
}

export const getGraphRevenue = async (storeId: string) => {
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
    const monthlyRevenue: Record<number, number> = {};

    for (const order of paidOrders) {
      const month = new Date(order.createdAt).getMonth();
      const orderTotal = order.orderItems.reduce((acc, orderItem) => {
        return acc + +orderItem.product.price;
      }, 0);

      if (monthlyRevenue[month]) {
        monthlyRevenue[month] += orderTotal;
      } else {
        monthlyRevenue[month] = orderTotal;
      }
    }

    const graphData: GraphRevenue[] = [
      { name: "Jan", revenue: 0 },
      { name: "Feb", revenue: 0 },
      { name: "Mar", revenue: 0 },
      { name: "Apr", revenue: 0 },
      { name: "May", revenue: 0 },
      { name: "Jun", revenue: 0 },
      { name: "Jul", revenue: 0 },
      { name: "Aug", revenue: 0 },
      { name: "Sep", revenue: 0 },
      { name: "Oct", revenue: 0 },
      { name: "Nov", revenue: 0 },
      { name: "Dec", revenue: 0 },
    ];

    for (const month in monthlyRevenue) {
      graphData[+month].revenue = monthlyRevenue[+month];
    }

    return graphData;
  } catch (error) {
    console.error(error);

    return null;
  }
};

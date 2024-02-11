"use server";
import prisma from "@/lib/prisma";

export const getOrderByOrderId = async (orderId: string) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return order;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getAllOrdersByStoreId = async (storeId: string) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        storeId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return orders;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getAllOrders = async () => {
  try {
    const orders = await prisma.order.findMany();

    return orders;
  } catch (error) {
    console.error(error);

    return null;
  }
};

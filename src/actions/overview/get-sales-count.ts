"use server";

import prisma from "@/lib/prisma";

export const getSalesCount = async (storeId: string) => {
  try {
    const salesCount = await prisma.order.count({
      where: {
        storeId,
        isPaid: true,
      },
    });

    return salesCount;
  } catch (error) {
    console.error(error);

    return null;
  }
};

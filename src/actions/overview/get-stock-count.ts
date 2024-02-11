"use server";

import prisma from "@/lib/prisma";

export const getStockCount = async (storeId: string) => {
  try {
    const stockCount = await prisma.product.count({
      where: {
        storeId,
        isArchived: false,
      },
    });

    return stockCount;
  } catch (error) {
    console.error(error);

    return null;
  }
};

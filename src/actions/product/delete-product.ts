"use server";
import prisma from "@/lib/prisma";

export const deleteProduct = async (productId: string) => {
  try {
    const product = await prisma.product.deleteMany({
      where: {
        id: productId,
      },
    });

    return product;
  } catch (error) {
    console.error(error);

    return null;
  }
};

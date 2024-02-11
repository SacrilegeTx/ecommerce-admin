"use server";
import prisma from "@/lib/prisma";

export const createCategory = async (name: string, billboardId: string, storeId: string) => {
  try {
    const category = await prisma.category.create({
      data: {
        name,
        billboardId,
        storeId,
      },
    });

    return category;
  } catch (error) {
    console.error(error);

    return null;
  }
};

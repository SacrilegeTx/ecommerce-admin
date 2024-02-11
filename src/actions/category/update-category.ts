"use server";
import prisma from "@/lib/prisma";

export const updateCategory = async (name: string, billboardId: string, categoryId: string) => {
  try {
    const category = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return category;
  } catch (error) {
    console.error(error);

    return null;
  }
};

"use server";
import prisma from "@/lib/prisma";

export const deleteCategory = async (categoryId: string) => {
  try {
    const category = await prisma.category.deleteMany({
      where: {
        id: categoryId,
      },
    });

    return category;
  } catch (error) {
    console.error(error);

    return null;
  }
};

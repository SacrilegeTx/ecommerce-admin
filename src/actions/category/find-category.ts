"use server";
import prisma from "@/lib/prisma";

export const getCategoryByCategoryId = async (categoryId: string) => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        billboard: true,
      },
    });

    return category;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getAllCategoriesByStoreId = async (storeId: string) => {
  try {
    const billboards = await prisma.category.findMany({
      where: {
        storeId,
      },
      include: {
        billboard: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return billboards;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany();

    return categories;
  } catch (error) {
    console.error(error);

    return null;
  }
};

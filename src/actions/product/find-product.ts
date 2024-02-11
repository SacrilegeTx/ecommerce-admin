"use server";
import prisma from "@/lib/prisma";

export const getProductByProductId = async (productId: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
      },
    });

    return product;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getProductByProductIds = async (productIds: string[]) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    return products;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getProductByProductIdIncludeRelations = async (productId: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    return product;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getAllProductsByStoreId = async (storeId: string) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        storeId,
      },
      include: {
        category: true,
        size: true,
        color: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return products;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getAllProductsByStoreIdAndFilters = async (
  storeId: string,
  categoryId: string | undefined,
  colorId: string | undefined,
  sizeId: string | undefined,
  isFeatured: string | null,
) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return products;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany();

    return products;
  } catch (error) {
    console.error(error);

    return null;
  }
};

"use server";
import prisma from "@/lib/prisma";

export const getSizeBySizeId = async (sizeId: string) => {
  try {
    const size = await prisma.size.findUnique({
      where: {
        id: sizeId,
      },
    });

    return size;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getAllSizesByStoreId = async (storeId: string) => {
  try {
    const sizes = await prisma.size.findMany({
      where: {
        storeId,
      },
      include: {
        store: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return sizes;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getAllSizes = async () => {
  try {
    const sizes = await prisma.size.findMany();

    return sizes;
  } catch (error) {
    console.error(error);

    return null;
  }
};

"use server";
import prisma from "@/lib/prisma";

export const updateStore = async (name: string, userId: string, storeId: string) => {
  try {
    const store = await prisma.store.updateMany({
      where: {
        id: storeId,
        userId,
      },
      data: {
        name,
      },
    });

    return store;
  } catch (error) {
    console.error(error);

    return null;
  }
};

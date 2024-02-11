"use server";
import prisma from "@/lib/prisma";

export const deleteStore = async (userId: string, storeId: string) => {
  try {
    const store = await prisma.store.deleteMany({
      where: {
        id: storeId,
        userId,
      },
    });

    return store;
  } catch (error) {
    console.error(error);

    return null;
  }
};

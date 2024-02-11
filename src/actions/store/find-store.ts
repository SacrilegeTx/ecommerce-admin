"use server";
import prisma from "@/lib/prisma";

export const getStoreByStoreIdAndUserId = async (storeId: string, userId: string) => {
  try {
    const store = await prisma.store.findFirst({
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

export const getStoreByStoreId = async (storeId: string) => {
  try {
    const store = await prisma.store.findFirst({
      where: {
        id: storeId,
      },
    });

    return store;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getStoresByUserId = async (userId: string) => {
  try {
    const stores = await prisma.store.findMany({
      where: {
        userId,
      },
    });

    return stores;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getStoreByUserId = async (userId: string) => {
  try {
    const stores = await prisma.store.findFirst({
      where: {
        userId,
      },
    });

    return stores;
  } catch (error) {
    console.error(error);

    return null;
  }
};

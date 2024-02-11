"use server";
import prisma from "@/lib/prisma";

export const createStore = async (name: string, userId: string) => {
  try {
    const store = await prisma.store.create({
      data: {
        name,
        userId,
      },
    });

    return store;
  } catch (error) {
    console.error(error);

    return null;
  }
};

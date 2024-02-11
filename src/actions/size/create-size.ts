"use server";
import prisma from "@/lib/prisma";

export const createSize = async (name: string, value: string, storeId: string) => {
  try {
    const size = await prisma.size.create({
      data: {
        name,
        value,
        storeId,
      },
    });

    return size;
  } catch (error) {
    console.error(error);

    return null;
  }
};

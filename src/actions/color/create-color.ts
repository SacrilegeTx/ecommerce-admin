"use server";
import prisma from "@/lib/prisma";

export const createColor = async (name: string, value: string, storeId: string) => {
  try {
    const color = await prisma.color.create({
      data: {
        name,
        value,
        storeId,
      },
    });

    return color;
  } catch (error) {
    console.error(error);

    return null;
  }
};

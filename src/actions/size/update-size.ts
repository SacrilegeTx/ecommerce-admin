"use server";
import prisma from "@/lib/prisma";

export const updateSize = async (name: string, value: string, sizeId: string) => {
  try {
    const size = await prisma.size.updateMany({
      where: {
        id: sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return size;
  } catch (error) {
    console.error(error);

    return null;
  }
};

"use server";
import prisma from "@/lib/prisma";

export const deleteSize = async (sizeId: string) => {
  try {
    const size = await prisma.size.deleteMany({
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

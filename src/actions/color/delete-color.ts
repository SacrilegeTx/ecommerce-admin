"use server";
import prisma from "@/lib/prisma";

export const deleteColor = async (colorId: string) => {
  try {
    const color = await prisma.color.deleteMany({
      where: {
        id: colorId,
      },
    });

    return color;
  } catch (error) {
    console.error(error);

    return null;
  }
};

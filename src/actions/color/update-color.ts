"use server";
import prisma from "@/lib/prisma";

export const updateColor = async (name: string, value: string, colorId: string) => {
  try {
    const color = await prisma.color.updateMany({
      where: {
        id: colorId,
      },
      data: {
        name,
        value,
      },
    });

    return color;
  } catch (error) {
    console.error(error);

    return null;
  }
};

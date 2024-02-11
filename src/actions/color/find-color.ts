"use server";
import prisma from "@/lib/prisma";

export const getColorByColorId = async (colorId: string) => {
  try {
    const color = await prisma.color.findUnique({
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

export const getAllColorsByStoreId = async (storeId: string) => {
  try {
    const colors = await prisma.color.findMany({
      where: {
        storeId,
      },
      include: {
        store: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return colors;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getAllColors = async () => {
  try {
    const colors = await prisma.color.findMany();

    return colors;
  } catch (error) {
    console.error(error);

    return null;
  }
};

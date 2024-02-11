"use server";
import prisma from "@/lib/prisma";

export const createBillboard = async (label: string, imageUrl: string, storeId: string) => {
  try {
    const billboard = await prisma.billboard.create({
      data: {
        label,
        imageUrl,
        storeId,
      },
    });

    return billboard;
  } catch (error) {
    console.error(error);

    return null;
  }
};

"use server";
import prisma from "@/lib/prisma";

export const updateBillboard = async (label: string, imageUrl: string, billboarId: string) => {
  try {
    const billboard = await prisma.billboard.updateMany({
      where: {
        id: billboarId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return billboard;
  } catch (error) {
    console.error(error);

    return null;
  }
};

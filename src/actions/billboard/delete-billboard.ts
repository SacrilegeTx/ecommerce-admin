"use server";
import prisma from "@/lib/prisma";

export const deleteBillboard = async (billboardId: string) => {
  try {
    const billboard = await prisma.billboard.deleteMany({
      where: {
        id: billboardId,
      },
    });

    return billboard;
  } catch (error) {
    console.error(error);

    return null;
  }
};

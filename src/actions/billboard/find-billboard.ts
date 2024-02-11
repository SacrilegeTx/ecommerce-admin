"use server";
import prisma from "@/lib/prisma";

export const getBillboardByBillboardId = async (billboardId: string) => {
  try {
    const billboard = await prisma.billboard.findUnique({
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

export const getAllBillboardsByStoreId = async (storeId: string) => {
  try {
    const billboards = await prisma.billboard.findMany({
      where: {
        storeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return billboards;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getAllBillboards = async () => {
  try {
    const billboards = await prisma.billboard.findMany();

    return billboards;
  } catch (error) {
    console.error(error);

    return null;
  }
};

"use server";
import prisma from "@/lib/prisma";

export const createProduct = async (
  name: string,
  price: number,
  categoryId: string,
  colorId: string,
  sizeId: string,
  storeId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images: any[],
  isFeatured: boolean,
  isArchived: boolean,
) => {
  try {
    // const arrayImages = Object.values(imageUrls).map((image: { url: string }) => image);

    const product = await prisma.product.create({
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        isFeatured,
        isArchived,
      },
    });

    return product;
  } catch (error) {
    console.error(error);

    return null;
  }
};

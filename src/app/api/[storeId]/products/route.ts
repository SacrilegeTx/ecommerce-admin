import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { getStoreByStoreIdAndUserId } from "@/actions/store/find-store";
import { createProduct } from "@/actions/product/create-product";
import { getAllProductsByStoreIdAndFilters } from "@/actions/product/find-product";

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { storeId } = params;
    const { name, price, categoryId, colorId, sizeId, images, isFeatured, isArchived } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Missing name", { status: 400 });
    }

    if (!images?.length) {
      return new NextResponse("Missing images", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Missing price", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Missing category id", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Missing color id", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Missing size id", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Missing store id", { status: 400 });
    }

    const storeByUserId = await getStoreByStoreIdAndUserId(storeId, userId);

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const product = await createProduct(
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      storeId,
      images,
      isFeatured,
      isArchived,
    );

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    const { storeId } = params;

    if (!storeId) {
      return new NextResponse("Missing store id", { status: 400 });
    }

    const products = await getAllProductsByStoreIdAndFilters(
      storeId,
      categoryId,
      colorId,
      sizeId,
      isFeatured,
    );

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { getStoreByStoreIdAndUserId } from "@/actions/store/find-store";
import { getProductByProductIdIncludeRelations } from "@/actions/product/find-product";
import { updateProduct } from "@/actions/product/update-product";
import { deleteProduct } from "@/actions/product/delete-product";

export async function GET(_req: Request, { params }: { params: { productId: string } }) {
  try {
    const { productId } = params;

    if (!productId) {
      return new NextResponse("Missing product id", { status: 400 });
    }

    const product = await getProductByProductIdIncludeRelations(productId);

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } },
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, price, categoryId, colorId, sizeId, images, isFeatured, isArchived } = body;
    const { storeId, productId } = params;

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

    if (!productId) {
      return new NextResponse("Missing product id", { status: 400 });
    }

    const storeByUserId = await getStoreByStoreIdAndUserId(storeId, userId);

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const product = await updateProduct(
      productId,
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    );

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; productId: string } },
) {
  try {
    const { userId } = auth();
    const { storeId, productId } = params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!productId) {
      return new NextResponse("Missing product id", { status: 400 });
    }

    const storeByUserId = await getStoreByStoreIdAndUserId(storeId, userId);

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const product = await deleteProduct(productId);

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

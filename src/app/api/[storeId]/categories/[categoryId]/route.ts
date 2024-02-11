import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { getStoreByStoreIdAndUserId } from "@/actions/store/find-store";
import { getCategoryByCategoryId } from "@/actions/category/find-category";
import { updateCategory } from "@/actions/category/update-category";
import { deleteCategory } from "@/actions/category/delete-category";

export async function GET(_req: Request, { params }: { params: { categoryId: string } }) {
  try {
    const { categoryId } = params;

    if (!categoryId) {
      return new NextResponse("Missing category id", { status: 400 });
    }

    const category = await getCategoryByCategoryId(categoryId);

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } },
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, billboardId } = body;
    const { storeId, categoryId } = params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Missing name", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("Missing billboard id", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Missing category id", { status: 400 });
    }

    const storeByUserId = await getStoreByStoreIdAndUserId(storeId, userId);

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const category = await updateCategory(name, billboardId, categoryId);

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; categoryId: string } },
) {
  try {
    const { userId } = auth();
    const { storeId, categoryId } = params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!categoryId) {
      return new NextResponse("Missing category id", { status: 400 });
    }

    const storeByUserId = await getStoreByStoreIdAndUserId(storeId, userId);

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const category = await deleteCategory(categoryId);

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

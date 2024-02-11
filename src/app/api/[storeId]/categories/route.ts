import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { getStoreByStoreIdAndUserId } from "@/actions/store/find-store";
import { createCategory } from "@/actions/category/create-category";
import { getAllCategoriesByStoreId } from "@/actions/category/find-category";

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { storeId } = params;
    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Missing name", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Missing billboard id", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Missing store id", { status: 400 });
    }

    const storeByUserId = await getStoreByStoreIdAndUserId(storeId, userId);

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const category = await createCategory(name, billboardId, storeId);

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_POST_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { storeId } = params;

    if (!storeId) {
      return new NextResponse("Missing store id", { status: 400 });
    }

    const categories = await getAllCategoriesByStoreId(storeId);

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_GET_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

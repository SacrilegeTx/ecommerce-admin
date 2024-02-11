import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { createBillboard } from "@/actions/billboard/create-billboard";
import { getStoreByStoreIdAndUserId } from "@/actions/store/find-store";
import { getAllBillboardsByStoreId } from "@/actions/billboard/find-billboard";

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { storeId } = params;
    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!label) {
      return new NextResponse("Missing label", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Missing image url", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Missing store id", { status: 400 });
    }

    const storeByUserId = await getStoreByStoreIdAndUserId(storeId, userId);

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const billboard = await createBillboard(label, imageUrl, storeId);

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_POST_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { storeId } = params;

    if (!storeId) {
      return new NextResponse("Missing store id", { status: 400 });
    }

    const billboards = await getAllBillboardsByStoreId(storeId);

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARD_GET_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

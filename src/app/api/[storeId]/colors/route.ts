import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { getStoreByStoreIdAndUserId } from "@/actions/store/find-store";
import { createColor } from "@/actions/color/create-color";
import { getAllColorsByStoreId } from "@/actions/color/find-color";

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { storeId } = params;
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Missing name", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Missing color value", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Missing store id", { status: 400 });
    }

    const storeByUserId = await getStoreByStoreIdAndUserId(storeId, userId);

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const color = await createColor(name, value, storeId);

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLORS_POST_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { storeId } = params;

    if (!storeId) {
      return new NextResponse("Missing store id", { status: 400 });
    }

    const colors = await getAllColorsByStoreId(storeId);

    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLORS_GET_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

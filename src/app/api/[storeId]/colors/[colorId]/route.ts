import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { getStoreByStoreIdAndUserId } from "@/actions/store/find-store";
import { getColorByColorId } from "@/actions/color/find-color";
import { updateColor } from "@/actions/color/update-color";
import { deleteColor } from "@/actions/color/delete-color";

export async function GET(_req: Request, { params }: { params: { colorId: string } }) {
  try {
    const { colorId } = params;

    if (!colorId) {
      return new NextResponse("Missing color id", { status: 400 });
    }

    const color = await getColorByColorId(colorId);

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_GET_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } },
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, value } = body;
    const { storeId, colorId } = params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Missing name", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Missing color value", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Missing color id", { status: 400 });
    }

    const storeByUserId = await getStoreByStoreIdAndUserId(storeId, userId);

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const color = await updateColor(name, value, colorId);

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_PATCH_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; colorId: string } },
) {
  try {
    const { userId } = auth();
    const { storeId, colorId } = params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!colorId) {
      return new NextResponse("Missing color id", { status: 400 });
    }

    const storeByUserId = await getStoreByStoreIdAndUserId(storeId, userId);

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const color = await deleteColor(colorId);

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_DELETE_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

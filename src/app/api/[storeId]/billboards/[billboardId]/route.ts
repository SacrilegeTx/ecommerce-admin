import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { getStoreByStoreIdAndUserId } from "@/actions/store/find-store";
import { updateBillboard } from "@/actions/billboard/update-billboard";
import { deleteBillboard } from "@/actions/billboard/delete-billboard";
import { getBillboardByBillboardId } from "@/actions/billboard/find-billboard";

export async function GET(_req: Request, { params }: { params: { billboardId: string } }) {
  try {
    const { billboardId } = params;

    if (!billboardId) {
      return new NextResponse("Missing billboardId", { status: 400 });
    }

    const billboard = await getBillboardByBillboardId(billboardId);

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } },
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;
    const { storeId, billboardId } = params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!label) {
      return new NextResponse("Missing name", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("Missing image url", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Missing billboardId", { status: 400 });
    }

    const storeByUserId = await getStoreByStoreIdAndUserId(storeId, userId);

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const billboard = await updateBillboard(label, imageUrl, billboardId);

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; billboardId: string } },
) {
  try {
    const { userId } = auth();
    const { storeId, billboardId } = params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!billboardId) {
      return new NextResponse("Missing billboardId", { status: 400 });
    }

    const storeByUserId = await getStoreByStoreIdAndUserId(storeId, userId);

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const billboard = await deleteBillboard(billboardId);

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

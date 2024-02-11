import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { getStoreByStoreIdAndUserId } from "@/actions/store/find-store";
import { getSizeBySizeId } from "@/actions/size/find-size";
import { updateSize } from "@/actions/size/update-size";
import { deleteSize } from "@/actions/size/delete-size";

export async function GET(_req: Request, { params }: { params: { sizeId: string } }) {
  try {
    const { sizeId } = params;

    if (!sizeId) {
      return new NextResponse("Missing size id", { status: 400 });
    }

    const size = await getSizeBySizeId(sizeId);

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_GET_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } },
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, value } = body;
    const { storeId, sizeId } = params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Missing name", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Missing size value", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Missing size id", { status: 400 });
    }

    const storeByUserId = await getStoreByStoreIdAndUserId(storeId, userId);

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const size = await updateSize(name, value, sizeId);

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_PATCH_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; sizeId: string } },
) {
  try {
    const { userId } = auth();
    const { storeId, sizeId } = params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!sizeId) {
      return new NextResponse("Missing size id", { status: 400 });
    }

    const storeByUserId = await getStoreByStoreIdAndUserId(storeId, userId);

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const size = await deleteSize(sizeId);

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_DELETE_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

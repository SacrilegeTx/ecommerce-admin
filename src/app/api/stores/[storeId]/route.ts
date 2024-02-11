import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { updateStore } from "@/actions/store/update-store";
import { deleteStore } from "@/actions/store/delete-store";

export async function PATCH(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;
    const { storeId } = params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Missing name", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Missing storeId", { status: 400 });
    }

    const store = await updateStore(name, userId, storeId);

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_PATCH_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();
    const { storeId } = params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!storeId) {
      return new NextResponse("Missing storeId", { status: 400 });
    }

    const store = await deleteStore(userId, storeId);

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_DELETE_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

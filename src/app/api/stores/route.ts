import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { createStore } from "@/actions/store/create-store";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Missing name", { status: 400 });
    }

    const store = await createStore(name, userId);

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

import type Strpe from "stripe";

import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { getProductByProductIds } from "@/actions/product/find-product";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: corsHeaders,
    },
  );
}

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { productIds } = await req.json();

    if (!productIds || productIds.length === 0) {
      return new NextResponse("Missing product ids", { status: 400 });
    }

    const products = await getProductByProductIds(productIds);

    const lineItems: Strpe.Checkout.SessionCreateParams.LineItem[] = [];

    products!.forEach((product) => {
      lineItems.push({
        price_data: {
          currency: "USD",
          product_data: {
            name: product.name,
          },
          unit_amount: +(product.price.toNumber() * 100).toFixed(3),
        },
        quantity: 1,
      });
    });

    const order = await prisma.order.create({
      data: {
        storeId: params.storeId,
        isPaid: false,
        orderItems: {
          create: productIds.map((productId: string) => ({
            product: {
              connect: {
                id: productId,
              },
            },
          })),
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      // payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
      cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
      metadata: {
        orderId: order.id,
      },
    });

    return NextResponse.json(
      { url: session.url },
      {
        headers: corsHeaders,
      },
    );
  } catch (error) {
    console.error("[PAYMENT_INTENT_CREATE_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

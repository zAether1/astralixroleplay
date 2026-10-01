import { NextResponse } from "next/server";
import { tip4serv } from "@/lib/tip4serv/client";
import { CheckoutRequest } from "@/lib/tip4serv/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validate the body
    if (!body || !body.products || !Array.isArray(body.products) || body.products.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid request. Products are required." },
        { status: 400 }
      );
    }

    // 2. Validate product IDs and quantities
    const productsToCheckout: { product_id: number; quantity: number }[] = [];
    
    for (const item of body.products) {
      if (!item.product_id || typeof item.product_id !== "number") {
        return NextResponse.json(
          { success: false, error: "Invalid product ID format." },
          { status: 400 }
        );
      }
      
      if (!item.quantity || typeof item.quantity !== "number" || item.quantity <= 0 || item.quantity > 100) {
        return NextResponse.json(
          { success: false, error: `Invalid quantity for product ${item.product_id}.` },
          { status: 400 }
        );
      }
      
      productsToCheckout.push({
        product_id: item.product_id,
        quantity: item.quantity,
      });
    }

    // 4 & 5 & 6 & 7. Construct request and call Tip4Serv
    const checkoutRequest: CheckoutRequest = {
      products: productsToCheckout,
    };

    const result = await tip4serv.createCheckout(checkoutRequest);

    // 9. Return only necessary info
    return NextResponse.json({
      success: true,
      url: result.url,
    });
  } catch (error: any) {
    // 8. Handle errors
    console.error("[API:CHECKOUT] Error creating checkout:", error.message);
    
    // Don't expose internal stack traces or secrets
    return NextResponse.json(
      { 
        success: false, 
        error: "Could not create checkout session. Please try again."
      },
      { status: error.status || 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    // 1. Verify Discord Session
    const session = await getSession();
    if (!session || !session.discord_id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please log in with Discord." },
        { status: 401 }
      );
    }

    const body = await request.json();

    // 2. Validate the body
    if (!body || !body.products || !Array.isArray(body.products) || body.products.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid request. Products are required." },
        { status: 400 }
      );
    }

    if (body.products.length > 50) {
      return NextResponse.json(
        { success: false, error: "Too many products in cart." },
        { status: 400 }
      );
    }

    // 3. Validate product IDs and quantities
    const productsToCheckout: { product_id: number; quantity: number }[] = [];
    
    for (const item of body.products) {
      if (!item.product_id || typeof item.product_id !== "number") {
        return NextResponse.json(
          { success: false, error: "Invalid product ID format." },
          { status: 400 }
        );
      }
      
      if (!item.quantity || typeof item.quantity !== "number" || item.quantity <= 0 || !Number.isInteger(item.quantity) || item.quantity > 100) {
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

    // 4. Validate API Key exists
    const apiKey = process.env.TIP4SERV_API_KEY;
    if (!apiKey) {
      console.error("[API:CHECKOUT] Missing TIP4SERV_API_KEY environment variable.");
      return NextResponse.json(
        { success: false, error: "Internal server error. Checkout unavailable." },
        { status: 500 }
      );
    }

    const origin = process.env.NEXT_PUBLIC_APP_URL;
    if (!origin) {
      console.error("[API:CHECKOUT] Missing NEXT_PUBLIC_APP_URL environment variable.");
      return NextResponse.json(
        { success: false, error: "Internal server error. Config error." },
        { status: 500 }
      );
    }

    // 5. Construct request to Tip4Serv
    const tip4servBody = {
      products: productsToCheckout,
      user: {
        discord_id: session.discord_id,
      },
      redirect_success_checkout: `${origin}/tienda`,
      redirect_canceled_checkout: `${origin}/tienda`,
    };

    const tip4servUrl = `https://api.tip4serv.com/v1/store/checkout?store=23746`;

    const tip4servResponse = await fetch(tip4servUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(tip4servBody),
    });

    const result = await tip4servResponse.json();

    if (!tip4servResponse.ok) {
      console.error("[API:CHECKOUT] Tip4Serv error:", tip4servResponse.status, result);
      return NextResponse.json(
        { success: false, error: "Failed to create checkout with payment provider." },
        { status: tip4servResponse.status }
      );
    }

    if (!result.url || typeof result.url !== "string" || !result.url.includes("tip4serv.com")) {
      console.error("[API:CHECKOUT] Tip4Serv response missing valid URL:", result);
      return NextResponse.json(
        { success: false, error: "Invalid response from payment provider." },
        { status: 502 }
      );
    }

    // 6. Return the URL
    return NextResponse.json({
      success: true,
      url: result.url,
    });
  } catch (error: any) {
    console.error("[API:CHECKOUT] Unexpected error:", error.message);
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Could not create checkout session. Please try again."
      },
      { status: 500 }
    );
  }
}

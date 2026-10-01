import { NextResponse } from "next/server";
import { tip4serv } from "@/lib/tip4serv/client";
import { normalizeProduct } from "@/lib/tip4serv/normalizer";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    
    const options: any = {
      only_enabled: true,
      details: true,
    };
    
    if (category && category !== "all") {
      options.category = category;
    }

    const productsRaw = await tip4serv.getProducts(options);
    const data = Array.isArray(productsRaw) ? productsRaw : (productsRaw?.products || productsRaw?.data || []);
    
    const products = data.map(normalizeProduct).filter(Boolean);

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("[API:PRODUCTS] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { tip4serv } from "@/lib/tip4serv/client";
import { normalizeCategory, buildCategoryTree } from "@/lib/tip4serv/normalizer";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const categoriesRaw = await tip4serv.getCategories();
    const data = Array.isArray(categoriesRaw) ? categoriesRaw : categoriesRaw?.categories || categoriesRaw?.data || [];
    
    const categories = data.map(normalizeCategory);
    const categoryTree = buildCategoryTree(categories.filter(Boolean) as any);

    return NextResponse.json({
      success: true,
      categories: categoryTree,
    });
  } catch (error) {
    console.error("[API:CATEGORIES] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

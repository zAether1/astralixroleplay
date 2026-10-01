import CategorySidebar from "@/components/navigation/CategorySidebar";
import ProductGrid from "@/components/products/ProductGrid";
import { tip4serv } from "@/lib/tip4serv/client";
import { normalizeCategory, buildCategoryTree, normalizeProduct } from "@/lib/tip4serv/normalizer";
import { Category, Product } from "@/lib/tip4serv/types";

export const dynamic = "force-dynamic";

export default async function TiendaPage({
  searchParams,
}: {
  searchParams: { cat?: string };
}) {
  // Fetch categories
  let categories: Category[] = [];
  try {
    const categoriesRaw = await tip4serv.getCategories();
    const data = Array.isArray(categoriesRaw) ? categoriesRaw : categoriesRaw?.categories || categoriesRaw?.data || [];
    const normalized = data.map(normalizeCategory).filter(Boolean) as Category[];
    categories = buildCategoryTree(normalized);
  } catch (error) {
    console.error("[TiendaPage] Error fetching categories:", error);
  }

  // Fetch products
  let products: Product[] = [];
  try {
    const options: any = { only_enabled: true, details: true };
    if (searchParams.cat && searchParams.cat !== "all") {
      options.category = searchParams.cat;
    }

    const productsRaw = await tip4serv.getProducts(options);
    const data = Array.isArray(productsRaw) ? productsRaw : (productsRaw?.products || productsRaw?.data || []);
    products = data.map(normalizeProduct).filter(Boolean) as Product[];
  } catch (error) {
    console.error("[TiendaPage] Error fetching products:", error);
  }

  return (
    <>
      <CategorySidebar categories={categories} />
      <ProductGrid products={products} />
    </>
  );
}

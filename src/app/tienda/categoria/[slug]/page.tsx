import { tip4serv } from "@/lib/tip4serv/client";
import { normalizeCategory, normalizeProduct } from "@/lib/tip4serv/normalizer";
import { Category, Product } from "@/lib/tip4serv/types";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CategoryTabs } from "@/components/layout/CategoryTabs";

export const dynamic = "force-dynamic";

function buildCategoryTree(categories: Category[]): Category[] {
  return categories.filter((c) => !(c as any).hide);
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const currentCategory = params.slug;

  let categories: Category[] = [];
  try {
    const categoriesRaw = await tip4serv.getCategories();
    const data = Array.isArray(categoriesRaw)
      ? categoriesRaw
      : categoriesRaw?.categories || categoriesRaw?.data || [];
    const normalized = data
      .map(normalizeCategory)
      .filter(Boolean) as Category[];
    categories = buildCategoryTree(normalized);
  } catch (error) {
    console.error("[CategoryPage] Error fetching categories:", error);
  }

  let products: Product[] = [];
  try {
    const productsRaw = await tip4serv.getProducts();
    const data = Array.isArray(productsRaw)
      ? productsRaw
      : productsRaw?.products || productsRaw?.data || [];
    products = data.map(normalizeProduct).filter(Boolean) as Product[];
  } catch (error) {
    console.error("[CategoryPage] Error fetching products:", error);
  }

  // Filter products for this specific category
  let filteredProducts: Product[] = [];
  const categoryObj = categories.find((c) => c.slug === currentCategory);
  if (categoryObj) {
    filteredProducts = products.filter(
      (p) => String(p.categoryId) === String(categoryObj.id)
    );
  }

  return (
    <main className="store-page">
      <div className="store-container">
        {/* TABS CATEGORIES 1:1 WITH ORIGINAL */}
        <CategoryTabs categories={categories} currentCategorySlug={currentCategory} />

        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div style={{ textAlign: "center", padding: "4rem", color: "var(--color-text-muted)" }}>
            No hay productos disponibles en esta categoría.
          </div>
        )}
      </div>
    </main>
  );
}

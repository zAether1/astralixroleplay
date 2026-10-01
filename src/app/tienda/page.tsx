import { tip4serv } from "@/lib/tip4serv/client";
import { normalizeCategory, normalizeProduct } from "@/lib/tip4serv/normalizer";
import { Category, Product } from "@/lib/tip4serv/types";
import { ProductGrid } from "@/components/products/ProductGrid";
import Link from "next/link";

export const dynamic = "force-dynamic";

function buildCategoryTree(categories: Category[]): Category[] {
  return categories.filter(c => !(c as any).hide);
}

export default async function TiendaPage({
  searchParams,
}: {
  searchParams: { cat?: string };
}) {
  let categories: Category[] = [];
  try {
    const categoriesRaw = await tip4serv.getCategories();
    const data = Array.isArray(categoriesRaw) ? categoriesRaw : categoriesRaw?.categories || categoriesRaw?.data || [];
    const normalized = data.map(normalizeCategory).filter(Boolean) as Category[];
    categories = buildCategoryTree(normalized);
  } catch (error) {
    console.error("[TiendaPage] Error fetching categories:", error);
  }

  let products: Product[] = [];
  try {
    const productsRaw = await tip4serv.getProducts();
    const data = Array.isArray(productsRaw) ? productsRaw : productsRaw?.products || productsRaw?.data || [];
    products = data.map(normalizeProduct).filter(Boolean) as Product[];
  } catch (error) {
    console.error("[TiendaPage] Error fetching products:", error);
  }

  const currentCategory = searchParams.cat || categories[0]?.slug || "all";

  // Filter logic
  let filteredProducts = products;
  if (currentCategory !== "all") {
    const categoryObj = categories.find((c) => c.slug === currentCategory);
    if (categoryObj) {
      filteredProducts = products.filter((p) => String(p.categoryId) === String(categoryObj.id));
    } else {
      filteredProducts = [];
    }
  }

  return (
    <main className="store-page">
      <div className="store-container">
        
        <div className="store-hero">
          <div className="store-hero-left">
            <h1 className="store-hero-title">
              BIENVENIDO A <span className="accent">LA TIENDA</span>
            </h1>
            <p className="store-hero-subtitle">
              Adquiere rangos, vehículos y beneficios exclusivos para mejorar tu experiencia en AstralixRoleplay.
            </p>
          </div>
          <div className="store-hero-right">
             {/* Original hero image would go here if they had one */}
          </div>
        </div>

        <div className="store-tabs-wrap">
          <div className="store-tabs">
            <Link 
              href="/tienda?cat=all"
              className={`store-tab ${currentCategory === "all" ? "store-tab--active" : ""}`}
            >
              <i className="fa-solid fa-border-all"></i> Todo
            </Link>
            {categories.map((cat) => (
              <Link 
                key={cat.id} 
                href={`/tienda?cat=${cat.slug}`}
                className={`store-tab ${currentCategory === cat.slug ? "store-tab--active" : ""}`}
              >
                <i className={`fa-solid ${(cat as any).icon || "fa-cube"}`}></i> {cat.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="store-section">
          <ProductGrid products={filteredProducts} />
        </div>

      </div>
    </main>
  );
}

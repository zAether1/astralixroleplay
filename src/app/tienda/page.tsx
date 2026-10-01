import { tip4serv } from "@/lib/tip4serv/client";
import { normalizeCategory, normalizeProduct } from "@/lib/tip4serv/normalizer";
import { Category, Product } from "@/lib/tip4serv/types";
import { ProductGrid } from "@/components/products/ProductGrid";
import Link from "next/link";

export const dynamic = "force-dynamic";

function buildCategoryTree(categories: Category[]): Category[] {
  return categories.filter(c => !(c as any).hide);
}

// Mapeo genérico de iconos para las categorías
function getCategoryIcon(slug: string): string {
  const iconMap: Record<string, string> = {
    vip: "fa-crown",
    vips: "fa-crown",
    paquetes: "fa-box-open",
    dinero: "fa-coins",
    naranjitas: "fa-coins",
    vehiculos: "fa-car",
    peds: "fa-user-ninja",
    extras: "fa-plus",
    "ropa-personalizada": "fa-shirt",
    ropa: "fa-shirt",
    organizaciones: "fa-users",
    sanciones: "fa-gavel"
  };
  return iconMap[slug.toLowerCase()] || "fa-cube";
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
        
        {/* HERO SECTION 1:1 WITH ORIGINAL */}
        <div className="store-hero">
          <div className="store-hero-left">
            <img 
              src="/assets/original/logo.png" 
              alt="AstralixRoleplay Logo" 
              className="store-hero-logo" 
            />
            <h1 className="store-hero-title">
              ¡BIENVENIDO AL MEJOR<br/>SERVIDOR DE ESPAÑA!
            </h1>
            <p className="store-hero-subtitle">
              ¡Gracias por formar parte de este gran proyecto!
            </p>
          </div>
          <div className="store-hero-right">
             <img 
               src="/assets/original/home.png" 
               alt="AstralixRoleplay Home Assets" 
               className="store-hero-img" 
             />
          </div>
        </div>

        {/* TABS CATEGORIES 1:1 WITH ORIGINAL */}
        <div className="store-tabs-wrap">
          <div className="store-tabs">
            {categories.map((cat) => (
              <Link 
                key={cat.id} 
                href={`/tienda?cat=${cat.slug}`}
                className={`store-tab ${currentCategory === cat.slug ? "store-tab--active" : ""}`}
              >
                <i className={`fa-solid ${getCategoryIcon(cat.slug)}`}></i> {cat.name}
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

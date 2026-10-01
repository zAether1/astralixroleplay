import { tip4serv } from "@/lib/tip4serv/client";
import { normalizeCategory, normalizeProduct } from "@/lib/tip4serv/normalizer";
import { Category, Product } from "@/lib/tip4serv/types";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CategoryTabs } from "@/components/layout/CategoryTabs";
import { Ticker } from "@/components/landing/Ticker";

export const dynamic = "force-dynamic";

function buildCategoryTree(categories: Category[]): Category[] {
  return categories.filter(c => !(c as any).hide);
}

export default async function TiendaPage() {
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

  const currentCategory = categories[0]?.slug || "";

  // Filter logic for homepage (defaults to first category)
  let filteredProducts = products;
  if (currentCategory) {
    const categoryObj = categories.find((c) => c.slug === currentCategory);
    if (categoryObj) {
      filteredProducts = products.filter((p) => String(p.categoryId) === String(categoryObj.id));
    } else {
      filteredProducts = [];
    }
  }

  return (
    <main className="store-page landing-body--open">
      <div className="store-container">
        
        <Ticker />
        
        {/* HERO SECTION 1:1 WITH ORIGINAL */}
        <div className="store-hero">
          <div className="store-hero-left">
            <img 
              src="/assets/original/logo.png" 
              alt="AstralixRoleplay Logo" 
              className="store-hero-logo reveal reveal-1" 
            />
            <h1 className="store-hero-title reveal reveal-2">
              ¡BIENVENIDO AL MEJOR<br/>SERVIDOR DE ESPAÑA!
            </h1>
            <p className="store-hero-subtitle reveal reveal-3">
              ¡Gracias por formar parte de este gran proyecto!
            </p>
          </div>
          <div className="store-hero-right reveal reveal-4">
             <img 
               src="/assets/original/home.png" 
               alt="AstralixRoleplay Home Assets" 
               className="store-hero-img" 
             />
          </div>
        </div>

        {/* FEATURES GRID 1:1 WITH ORIGINAL */}
        <div className="store-features-section" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            BIENVENIDO A <span style={{ color: 'var(--color-accent)' }}>ASTRALIX RP</span>
          </h2>
          <div className="store-features">
            <div className="store-feature-card">
              <i className="fa-solid fa-truck-fast store-feature-icon"></i>
              <h3 className="store-feature-title">ENTREGA INSTANTANEA</h3>
              <p className="store-feature-desc">La gran mayoría de nuestros productos se entregan tan pronto como se complete su pago. En caso de no entregarse en un tiempo estimado de 10 minutos, por favor contáctenos vía Discord.</p>
            </div>
            <div className="store-feature-card">
              <i className="fa-solid fa-lock store-feature-icon"></i>
              <h3 className="store-feature-title">SEGURIDAD</h3>
              <p className="store-feature-desc">Protección segura y confiable para todas sus transacciones y datos personales, garantizando la máxima privacidad y brindándole total confianza en cada operación que realice.</p>
            </div>
            <div className="store-feature-card">
              <i className="fa-solid fa-headset store-feature-icon"></i>
              <h3 className="store-feature-title">SOPORTE DE CALIDAD</h3>
              <p className="store-feature-desc">Ofrecemos soporte directo a través de Discord, donde nuestro equipo está listo para ayudarte, además de guías fáciles de usar para que puedas navegar y resolver cualquier problema con facilidad.</p>
            </div>
          </div>
        </div>

        {/* TABS CATEGORIES 1:1 WITH ORIGINAL */}
        <CategoryTabs categories={categories} currentCategorySlug={currentCategory} />

        <div className="store-section">
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
              No hay productos disponibles en esta categoría.
            </div>
          )}
        </div>

      </div>
    </main>
  );
}

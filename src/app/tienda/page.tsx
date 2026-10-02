import { tip4serv } from "@/lib/tip4serv/client";
import { normalizeCategory } from "@/lib/tip4serv/normalizer";
import { Category } from "@/lib/tip4serv/types";
import { CategoryTabs } from "@/components/layout/CategoryTabs";
import { Ticker } from "@/components/landing/Ticker";
import { StoreReviews } from "@/components/landing/StoreReviews";

export const dynamic = "force-dynamic";

function buildCategoryTree(categories: Category[]): Category[] {
  return categories.filter((c) => !(c as any).hide);
}

export default async function TiendaPage() {
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
    console.error("[TiendaPage] Error fetching categories:", error);
  }

  // Original HOME structure order:
  // 1. Header (from layout)
  // 2. Ticker
  // 3. Hero (section.store-hero)
  // 4. Tabs (div.store-tabs-wrap) — links to category pages, NO product grid on home
  // 5. Features (section.store-features)
  // 6. Reviews (section.store-reviews)
  // 7. Footer (from layout)

  return (
    <main className="store-page landing-body--open">
      <div className="store-container">
        
        {/* TICKER */}
        <Ticker />
        
        {/* HERO SECTION 1:1 WITH ORIGINAL */}
        <div className="store-hero">
          <div className="store-hero-container">
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
        </div>

        {/* TABS CATEGORIES 1:1 WITH ORIGINAL */}
        <CategoryTabs categories={categories} />

        {/* FEATURES GRID 1:1 WITH ORIGINAL */}
        <div className="store-features-section">
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

        {/* REVIEWS */}
        <StoreReviews />
      </div>
    </main>
  );
}

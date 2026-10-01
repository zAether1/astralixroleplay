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
    <main className="store-page">
      {/* TICKER */}
      <Ticker />

      {/* HERO — matches original: section.store-hero > .store-hero-bg + .store-hero-container > (.store-hero-content + .store-hero-image) */}
      <section className="store-hero">
        <div className="store-hero-bg"></div>
        <div className="store-hero-container">
          <div className="store-hero-content">
            <img
              src="/assets/original/logo.png"
              alt="AstralixRoleplay Logo"
              className="store-hero-logo"
            />
            <h1 className="store-hero-title">
              ¡BIENVENIDO AL MEJOR SERVIDOR DE ESPAÑA!
            </h1>
            <p className="store-hero-subtitle">
              ¡Gracias por formar parte de este gran proyecto!
            </p>
          </div>
          <div className="store-hero-image">
            <img
              src="/assets/original/home.png"
              alt="AstralixRoleplay"
            />
          </div>
        </div>
      </section>

      {/* TABS — original has tabs on home that link to /category/[id], NO products on home */}
      <CategoryTabs categories={categories} />

      {/* FEATURES — matches original: section.store-features > .store-features-header + .store-features-grid */}
      <section className="store-features">
        <div className="store-features-header">
          <h2>
            BIENVENIDO A <span>ASTRALIX RP</span>
          </h2>
        </div>
        <div className="store-features-grid">
          <div className="store-feature-card">
            <div className="store-feature-icon">
              <i className="fa-solid fa-truck-fast"></i>
            </div>
            <h3>Entrega instantanea</h3>
            <p>
              La gran mayoría de nuestros productos se entregan tan pronto como
              se complete su pago. En caso de no entregarse en un tiempo
              estimado de 10 minutos, por favor contáctenos vía Discord.
            </p>
          </div>
          <div className="store-feature-card">
            <div className="store-feature-icon">
              <i className="fa-solid fa-lock"></i>
            </div>
            <h3>SEGURIDAD</h3>
            <p>
              Protección segura y confiable para todas sus transacciones y datos
              personales, garantizando la máxima privacidad y brindándole total
              confianza en cada operación que realice.
            </p>
          </div>
          <div className="store-feature-card">
            <div className="store-feature-icon">
              <i className="fa-solid fa-headset"></i>
            </div>
            <h3>SOPORTE DE CALIDAD</h3>
            <p>
              Ofrecemos soporte directo a través de Discord, donde nuestro
              equipo está listo para ayudarte, además de guías fáciles de usar
              para que puedas navegar y resolver cualquier problema con
              facilidad.
            </p>
          </div>
        </div>
      </section>

      {/* REVIEWS — matches original: section.store-reviews */}
      <StoreReviews />
    </main>
  );
}

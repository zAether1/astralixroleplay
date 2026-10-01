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
    <main className="landing-page">
      {/* TICKER */}
      <Ticker />

      {/* HERO */}
      <section className="landing-hero" style={{ minHeight: "60vh", padding: "6rem 2.4rem 4rem" }}>
        <div className="landing-body landing-body--open" style={{ maxHeight: "none", overflow: "visible" }}>
          <h1 className="landing-title reveal reveal-1" style={{ fontSize: "2.8rem" }}>
            Astralix<span className="accent">Roleplay</span>
          </h1>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: "800", color: "#fff", marginTop: "1rem" }} className="reveal reveal-2">
            ¡BIENVENIDO AL MEJOR SERVIDOR DE ESPAÑA!
          </h2>
          <p className="landing-subtitle reveal reveal-3">
            ¡Gracias por formar parte de este gran proyecto!
          </p>
        </div>
      </section>

      {/* TABS */}
      <CategoryTabs categories={categories} />

      {/* FEATURES */}
      <section className="landing-section">
        <div className="landing-section-inner">
          <span className="section-label">Características</span>
          <h2 className="section-title">BIENVENIDO A <span className="accent">ASTRALIX RP</span></h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrap">
                <i className="fa-solid fa-truck-fast"></i>
              </div>
              <h3 className="feature-title">Entrega instantánea</h3>
              <p className="feature-desc">
                La gran mayoría de nuestros productos se entregan tan pronto como
                se complete su pago. En caso de no entregarse en un tiempo
                estimado de 10 minutos, por favor contáctenos vía Discord.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrap">
                <i className="fa-solid fa-lock"></i>
              </div>
              <h3 className="feature-title">SEGURIDAD</h3>
              <p className="feature-desc">
                Protección segura y confiable para todas sus transacciones y datos
                personales, garantizando la máxima privacidad y brindándole total
                confianza en cada operación que realice.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrap">
                <i className="fa-solid fa-headset"></i>
              </div>
              <h3 className="feature-title">SOPORTE DE CALIDAD</h3>
              <p className="feature-desc">
                Ofrecemos soporte directo a través de Discord, donde nuestro
                equipo está listo para ayudarte, además de guías fáciles de usar
                para que puedas navegar y resolver cualquier problema con
                facilidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <StoreReviews />
    </main>
  );
}

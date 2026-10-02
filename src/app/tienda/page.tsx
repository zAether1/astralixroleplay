import { tip4serv } from "@/lib/tip4serv/client";
import { normalizeCategory } from "@/lib/tip4serv/normalizer";
import { Category } from "@/lib/tip4serv/types";
import { CategoryTabs } from "@/components/layout/CategoryTabs";
import { Ticker } from "@/components/landing/Ticker";
import { StoreReviews } from "@/components/landing/StoreReviews";
import { StoreOfferPopup } from "@/components/landing/StoreOfferPopup";
import { StoreAnimations } from "@/components/landing/StoreAnimations";

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

  // Original HOME structure order (from tiendav2.lanaranjarp.es):
  // 1. Header (from layout)
  // 2. Ticker / Announcement bar
  // 3. Hero (store-hero with logo left + home.png right)
  // 4. Tabs (store-tabs-wrap — category links)
  // 5. Features (store-features-section — 3 cards)
  // 6. Reviews (store-section — divider + review cards carousel)
  // 7. CTA Popup (store-offer-popup — fixed bottom-right)
  // 8. Footer (from layout)

  return (
    <main className="store-page">
      <StoreAnimations />
      {/* 1. TICKER / ANNOUNCEMENT BAR */}
      <Ticker />

      <div className="store-container">
        {/* 2. HERO */}
        <div className="store-hero">
          <div className="store-hero-left">
            <img
              src="/assets/original/logo.png"
              alt="AstralixRoleplay Logo"
              className="store-hero-logo"
            />
            <h1 className="store-hero-title">
              ¡BIENVENIDO AL MEJOR SERVIDOR DE ECUADOR!
            </h1>
            <p className="store-hero-subtitle">
              ¡Gracias por formar parte de este gran proyecto!
            </p>
          </div>
          <div className="store-hero-right">
            <img
              src="/assets/original/home.png"
              alt="AstralixRoleplay"
              className="store-hero-img"
            />
          </div>
        </div>

        {/* 3. CATEGORY TABS */}
        <CategoryTabs categories={categories} />

        {/* 4. FEATURES */}
        <div className="store-features-section">
          <div className="store-divider">
            <div className="store-divider-line" />
            <h2 className="store-section-title">
              BIENVENIDO A <span className="accent">ASTRALIX RP</span>
            </h2>
            <div className="store-divider-line" />
          </div>
          <div className="store-features">
            <div className="store-feature-card">
              <i className="fa-solid fa-truck-fast store-feature-icon" />
              <h3 className="store-feature-title">ENTREGA INSTANTANEA</h3>
              <p className="store-feature-desc">
                La gran mayoría de nuestros productos se entregan tan pronto como
                se complete su pago. En caso de no entregarse en un tiempo
                estimado de 10 minutos, por favor contáctenos vía Discord.
              </p>
            </div>
            <div className="store-feature-card">
              <i className="fa-solid fa-lock store-feature-icon" />
              <h3 className="store-feature-title">SEGURIDAD</h3>
              <p className="store-feature-desc">
                Protección segura y confiable para todas sus transacciones y datos
                personales, garantizando la máxima privacidad y brindándole total
                confianza en cada operación que realice.
              </p>
            </div>
            <div className="store-feature-card">
              <i className="fa-solid fa-headset store-feature-icon" />
              <h3 className="store-feature-title">SOPORTE DE CALIDAD</h3>
              <p className="store-feature-desc">
                Ofrecemos soporte directo a través de Discord, donde nuestro
                equipo está listo para ayudarte, además de guías fáciles de usar
                para que puedas navegar y resolver cualquier problema con
                facilidad.
              </p>
            </div>
          </div>
        </div>

        {/* 5. REVIEWS */}
        <StoreReviews />
      </div>

      {/* 6. PROMOTIONAL CTA POPUP (fixed position, bottom-right) */}
      <StoreOfferPopup />
    </main>
  );
}

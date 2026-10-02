"use client";

// Reviews section matching original template structure from tiendav2.lanaranjarp.es
// section.store-section > .store-divider > h2.store-section-title
// .store-reviews-header > (.store-reviews-social-proof)
// .store-reviews > .store-reviews-inner > .store-reviews-track > .store-review-card

const REVIEWS = [
  {
    text: "Compré el VIP Gold y la entrega fue inmediata. El servidor es increíble, muy recomendado.",
    name: "Carlos M.",
    role: "VIP Gold",
    stars: 5,
    avatar: null,
  },
  {
    text: "Excelente atención al cliente. Tuve un problema con mi compra y lo resolvieron en menos de 5 minutos por Discord.",
    name: "María G.",
    role: "Cliente habitual",
    stars: 5,
    avatar: null,
  },
  {
    text: "Los paquetes de dinero son geniales. La economía del servidor está muy bien balanceada y el dinero comprado se refleja al instante.",
    name: "Alejandro R.",
    role: "Jugador",
    stars: 5,
    avatar: null,
  },
  {
    text: "Llevo 6 meses jugando y cada compra ha sido perfecta. El soporte siempre está disponible.",
    name: "Laura P.",
    role: "VIP Diamond",
    stars: 5,
    avatar: null,
  },
  {
    text: "La ropa personalizada es brutal. Me encanta poder crear mi propio estilo en el servidor.",
    name: "Diego S.",
    role: "Jugador",
    stars: 4,
    avatar: null,
  },
  {
    text: "Muy contento con la compra del pack de organización. Todo funcionó perfecto desde el primer momento.",
    name: "Pablo F.",
    role: "Líder de org",
    stars: 5,
    avatar: null,
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="store-review-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <i
          key={i}
          className={`fa-solid fa-star ${i <= count ? "store-star--filled" : "store-star--empty"}`}
        />
      ))}
    </div>
  );
}

export function StoreReviews() {
  // Duplicate reviews for infinite scroll effect
  const allReviews = [...REVIEWS, ...REVIEWS];

  return (
    <div className="store-section">
      {/* SECTION TITLE WITH DIVIDER - matches original */}
      <div className="store-divider">
        <div className="store-divider-line" />
        <h2 className="store-section-title">
          BIENVENIDO A <span className="accent">ASTRALIX RP</span>
        </h2>
        <div className="store-divider-line" />
      </div>

      {/* REVIEWS HEADER */}
      <div className="store-reviews-header" style={{ marginBottom: "1.5rem" }}>
        <div className="store-reviews-badge">
          <i className="fa-solid fa-certificate" /> CALIDAD EXCELENTE
        </div>
        <h2 className="store-reviews-title">¡LA COMUNIDAD NOS AMA! &lt;3</h2>
        <p className="store-reviews-desc">
          No te quedes solo con nuestra palabra, escucha a quienes ya han
          comprado y disfrutado de nuestros productos.
        </p>

        {/* SOCIAL PROOF - matches original */}
        <div className="store-reviews-rating">
          <div className="store-reviews-social-proof">
            <div className="store-reviews-avatars-stack">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="store-reviews-avatar-item">
                  <i className="fa-solid fa-user" style={{ fontSize: ".8rem", color: "var(--color-accent)" }} />
                </div>
              ))}
            </div>
            <div className="store-reviews-rating-info">
              <div className="store-reviews-rating-top">
                <div className="store-reviews-stars-row">
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star-half-stroke" />
                </div>
                <span className="store-reviews-score">4.9</span>
              </div>
              <div className="store-reviews-count">
                <span>Más de</span>{" "}
                <strong>1.500 jugadores</strong>{" "}
                <span>satisfechos</span>
                <a
                  className="store-reviews-discord"
                  href="https://discord.gg/astralixrp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-discord" /> Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS CAROUSEL - matches original marquee */}
      <div className="store-reviews">
        <div className="store-reviews-inner">
          <div className="store-reviews-track">
            {allReviews.map((review, idx) => (
              <div key={idx} className="store-review-card">
                <div className="store-review-text">&ldquo;{review.text}&rdquo;</div>
                <div className="store-review-footer">
                  <div className="store-review-author">
                    <div className="store-review-avatar">
                      <i className="fa-solid fa-user" />
                    </div>
                    <div>
                      <span className="store-review-name">{review.name}</span>
                      <span className="store-review-role">{review.role}</span>
                    </div>
                  </div>
                  <StarRow count={review.stars} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

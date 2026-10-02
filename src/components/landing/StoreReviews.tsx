"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Reviews section matching original template structure from tiendav2.lanaranjarp.es
// section.store-section > .store-divider > h2.store-section-title
// .store-reviews-header > (.store-reviews-social-proof)
// .store-reviews > .store-reviews-inner > .store-reviews-track > .store-review-card

const REVIEW_SPEED = 25; // seconds for one full loop

const REVIEWS = [
  {
    text: "Compré el VIP Gold y la entrega fue inmediata. El servidor es increíble, muy recomendado.",
    name: "Carlos M.",
    role: "VIP Gold",
    stars: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos&backgroundColor=9000FA",
  },
  {
    text: "Excelente atención al cliente. Tuve un problema con mi compra y lo resolvieron en menos de 5 minutos por Discord.",
    name: "María G.",
    role: "Cliente habitual",
    stars: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria&backgroundColor=9000FA",
  },
  {
    text: "Los paquetes de dinero son geniales. La economía del servidor está muy bien balanceada y el dinero comprado se refleja al instante.",
    name: "Alejandro R.",
    role: "Jugador",
    stars: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alejandro&backgroundColor=9000FA",
  },
  {
    text: "Llevo 6 meses jugando y cada compra ha sido perfecta. El soporte siempre está disponible.",
    name: "Laura P.",
    role: "VIP Diamond",
    stars: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laura&backgroundColor=9000FA",
  },
  {
    text: "La ropa personalizada es brutal. Me encanta poder crear mi propio estilo en el servidor.",
    name: "Diego S.",
    role: "Jugador",
    stars: 4,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diego&backgroundColor=9000FA",
  },
  {
    text: "Muy contento con la compra del pack de organización. Todo funcionó perfecto desde el primer momento.",
    name: "Pablo F.",
    role: "Líder de org",
    stars: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pablo&backgroundColor=9000FA",
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Duplicate reviews for infinite scroll effect (triple to be safe with gsap)
  const allReviews = [...REVIEWS, ...REVIEWS, ...REVIEWS];

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    
    // Continuous marquee animation
    const trackWidth = track.scrollWidth;
    const singleSetWidth = trackWidth / 3;

    gsap.set(track, { x: 0 });

    const tween = gsap.to(track, {
      x: `-=${singleSetWidth}`,
      duration: REVIEW_SPEED,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % singleSetWidth)
      }
    });

    // Pause on hover
    const handleMouseEnter = () => tween.pause();
    const handleMouseLeave = () => tween.play();

    track.addEventListener("mouseenter", handleMouseEnter);
    track.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      tween.kill();
      track.removeEventListener("mouseenter", handleMouseEnter);
      track.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="store-section" ref={sectionRef}>
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
      <div className="store-reviews" style={{ overflow: 'hidden' }}>
        <div className="store-reviews-inner">
          <div className="store-reviews-track" ref={trackRef} style={{ display: 'flex', width: 'max-content' }}>
            {allReviews.map((review, idx) => (
              <div key={idx} className="store-review-card">
                <div className="store-review-text">&ldquo;{review.text}&rdquo;</div>
                <div className="store-review-footer">
                  <div className="store-review-author">
                    <div className="store-review-avatar" style={{ overflow: 'hidden', padding: 0 }}>
                      {review.avatar ? (
                        <img src={review.avatar} alt={review.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <i className="fa-solid fa-user" />
                      )}
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

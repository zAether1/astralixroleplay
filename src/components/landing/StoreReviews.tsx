import Image from "next/image";

// Local data structure for AstralixRoleplay reviews
const ASTRALIX_REVIEWS = [
  {
    id: 1,
    author: "Jugador_PRO",
    role: "Jugador",
    comment: "Excelente servicio, el VIP me llegó al instante. Totalmente recomendado para disfrutar del roleplay.",
    stars: 5,
    avatar: null
  },
  {
    id: 2,
    author: "Roleplayer99",
    role: "Usuario VIP",
    comment: "La atención del staff es de primera. Tuve una duda con mi compra y me la resolvieron en minutos.",
    stars: 5,
    avatar: null
  },
  {
    id: 3,
    author: "Anónimo",
    role: "Jugador",
    comment: "Los mejores coches y el servidor va super fluido. 10/10.",
    stars: 5,
    avatar: null
  },
  {
    id: 4,
    author: "AstralFan",
    role: "Jugador",
    comment: "Me compré un paquete de armas y todo perfecto. La comunidad es increíble.",
    stars: 5,
    avatar: null
  },
  {
    id: 5,
    author: "Carlos_G",
    role: "Miembro",
    comment: "Muy contento con mi rango, vale cada centavo.",
    stars: 4,
    avatar: null
  },
  {
    id: 6,
    author: "Anónimo",
    role: "Jugador",
    comment: "Sin duda el mejor servidor de España, la tienda funciona de maravilla.",
    stars: 5,
    avatar: null
  }
];

export function StoreReviews() {
  return (
    <section className="store-section store-reviews-section">
      <div className="store-reviews-container">
        
        {/* Section Header */}
        <div className="store-reviews-header">
          <div className="store-badge">
            <i className="fa-solid fa-star"></i>
            <span>CALIDAD EXCELENTE</span>
          </div>
          <h2 className="store-reviews-title">¡LA COMUNIDAD NOS AMA! &lt;3</h2>
          <p className="store-reviews-subtitle">
            No te quedes solo con nuestra palabra, escucha a quienes ya han comprado y disfrutado de nuestros productos en AstralixRoleplay.
          </p>
        </div>

        {/* Rating Summary / Discord Widget */}
        <div className="store-reviews-summary">
          <div className="store-reviews-avatars">
            <div className="store-reviews-avatar store-reviews-avatar--initials" style={{ background: 'var(--color-accent)' }}>J</div>
            <div className="store-reviews-avatar store-reviews-avatar--initials" style={{ background: '#3b82f6' }}>R</div>
            <div className="store-reviews-avatar store-reviews-avatar--initials" style={{ background: '#10b981' }}>A</div>
          </div>
          <div className="store-reviews-rating">
            <div className="store-reviews-stars">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star-half-stroke"></i>
            </div>
            <span className="store-reviews-score">4.9</span>
          </div>
          <div className="store-reviews-count">
            Más de <strong>1.500 jugadores</strong> satisfechos
          </div>
          <a className="store-reviews-discord" href="https://discord.gg/astralixrp" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-discord"></i> Discord
          </a>
        </div>

        {/* Reviews Grid */}
        <div className="store-reviews-grid">
          {ASTRALIX_REVIEWS.map((review) => (
            <div key={review.id} className="store-review-card">
              <p className="store-review-comment">&quot;{review.comment}&quot;</p>
              <div className="store-review-footer">
                <div className="store-review-author-info">
                  <div className="store-review-avatar">
                    {review.avatar ? (
                      <img src={review.avatar} alt={review.author} />
                    ) : (
                      <i className="fa-solid fa-user"></i>
                    )}
                  </div>
                  <div className="store-review-details">
                    <span className="store-review-name">{review.author}</span>
                    <span className="store-review-role">{review.role}</span>
                  </div>
                </div>
                <div className="store-review-stars">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fa-solid fa-star ${i >= review.stars ? "fa-regular" : ""}`}></i>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

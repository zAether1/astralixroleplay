// Reviews section matching original DOM:
// section.store-reviews > .store-reviews-container >
//   .store-reviews-header > (.store-reviews-tag + h2.store-reviews-title + p.store-reviews-subtitle)
//   .store-reviews-stats > (.store-reviews-rating + .store-reviews-count + a.store-reviews-discord)

export function StoreReviews() {
  return (
    <section className="store-reviews">
      <div className="store-reviews-container">
        <div className="store-reviews-header">
          <span className="store-reviews-tag">CALIDAD EXCELENTE</span>
          <h2 className="store-reviews-title">
            ¡LA COMUNIDAD NOS AMA! &lt;3
          </h2>
          <p className="store-reviews-subtitle">
            No te quedes solo con nuestra palabra, escucha a quienes ya han
            comprado y disfrutado de nuestros productos.
          </p>
        </div>
        <div className="store-reviews-stats">
          <div className="store-reviews-rating">
            <span className="store-reviews-score">4.9</span>
            <div className="store-reviews-stars">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star-half-stroke"></i>
            </div>
          </div>
          <div className="store-reviews-count">
            <span>Más de</span>
            <strong>1.500 jugadores</strong>
            <span>satisfechos</span>
          </div>
          <a
            className="store-reviews-discord"
            href="https://discord.gg/astralixrp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-discord"></i> Discord
          </a>
        </div>
      </div>
    </section>
  );
}

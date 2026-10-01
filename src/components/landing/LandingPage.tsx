import Link from "next/link";

export function LandingPage() {
  return (
    <main className="landing-page">
      <section className="landing-hero">
        <div className="landing-body landing-body--open">
          {/* We don't have an image logo, so we'll skip <img className="landing-logo..." /> for now */}
          <h1 className="landing-title reveal reveal-1">
            Astralix<span className="accent">Roleplay</span>
          </h1>
          <p className="landing-subtitle reveal reveal-2">
            La experiencia roleplay que estabas buscando.
          </p>
          <div className="cta-row reveal reveal-3">
            <Link href="/tienda" className="cta-button">
              Ver Tienda <i className="fa-solid fa-arrow-right cta-arrow"></i>
            </Link>
            <a href="https://discord.gg/your-invite" target="_blank" rel="noopener noreferrer" className="discord-button">
              <i className="fa-brands fa-discord discord-icon"></i> Discord
            </a>
          </div>
          
          <div className="stats-row reveal reveal-4">
            <div className="stats-card">
              <div className="stats-card-icon-box stats-card-icon-box--fivem">
                <i className="fa-solid fa-users stats-card-icon stats-card-icon--fivem"></i>
              </div>
              <div className="stats-card-info">
                <div className="stats-card-main">
                  <span className="stats-card-number">64</span>
                  <span className="stats-card-sep">/</span>
                  <span className="stats-card-max">128</span>
                  <span className="stats-card-status">
                    <span className="status-dot-sm"></span> Online
                  </span>
                </div>
                <span className="stats-card-label">Jugadores</span>
              </div>
            </div>

            <div className="stats-card stats-card--discord">
              <div className="stats-card-icon-box stats-card-icon-box--discord">
                <i className="fa-brands fa-discord stats-card-icon stats-card-icon--discord"></i>
              </div>
              <div className="stats-card-info">
                <div className="stats-card-main">
                  <span className="stats-card-number">1,245</span>
                </div>
                <span className="stats-card-label">Miembros en Discord</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Keyboard info section? We skip if not strictly needed, but let's add a features grid since it's in the CSS */}
      <section className="landing-section">
        <div className="landing-section-inner">
          <span className="section-label">Características</span>
          <h2 className="section-title">¿Por qué <span className="accent">elegirnos?</span></h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrap"><i className="fa-solid fa-server"></i></div>
              <h3 className="feature-title">Rendimiento Óptimo</h3>
              <p className="markdown-body">Servidor optimizado para ofrecerte la mejor experiencia sin caídas.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrap"><i className="fa-solid fa-users"></i></div>
              <h3 className="feature-title">Comunidad Activa</h3>
              <p className="markdown-body">Eventos diarios y una comunidad dispuesta a ayudarte.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrap"><i className="fa-solid fa-shield-halved"></i></div>
              <h3 className="feature-title">Anticheat Propio</h3>
              <p className="markdown-body">Sistema de seguridad para mantener el juego justo para todos.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="landing-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: "800", color: "#fff" }}>
            Astralix<span className="accent">Roleplay</span>
          </h2>
          <p className="footer-tagline">La experiencia roleplay que estabas buscando.</p>
        </div>
        <div className="footer-links-group">
          <h4 className="footer-links-title">Navegación</h4>
          <Link href="/tienda" className="footer-link"><i className="fa-solid fa-chevron-right"></i> Inicio</Link>
          <Link href="/normativa" className="footer-link"><i className="fa-solid fa-chevron-right"></i> Normativa</Link>
          <Link href="/faq" className="footer-link"><i className="fa-solid fa-chevron-right"></i> FAQ</Link>
          <Link href="/galeria" className="footer-link"><i className="fa-solid fa-chevron-right"></i> Galería</Link>
          <Link href="/guia" className="footer-link"><i className="fa-solid fa-chevron-right"></i> Guía de Inicio</Link>
        </div>
        <div className="footer-links-group">
          <h4 className="footer-links-title">Legal</h4>
          <Link href="/terminos" className="footer-link"><i className="fa-solid fa-chevron-right"></i> Términos y Condiciones</Link>
        </div>
        <div className="footer-links-group">
          <h4 className="footer-links-title">Redes Sociales</h4>
          <a href="https://www.tiktok.com/@astralixrp" className="footer-link" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-tiktok"></i> Tiktok
          </a>
          <Link href="/tienda" className="footer-link">
            <i className="fa-solid fa-store"></i> Tienda
          </Link>
          <a href="https://discord.gg/astralixrp" className="footer-link" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-discord"></i> Discord
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copyright">© 2026 AstralixRoleplay. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

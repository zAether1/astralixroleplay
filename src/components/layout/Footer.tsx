import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="store-footer">
      <div className="store-footer-container">
        <div className="store-footer-brand">
          <img 
            src="/assets/original/logo.png" 
            alt="AstralixRoleplay Logo" 
            className="store-footer-logo" 
          />
          <p className="store-footer-desc">La experiencia roleplay que estabas buscando.</p>
        </div>
        <div className="store-footer-col">
          <h4>Navegación</h4>
          <Link href="/tienda" className="footer-link">Inicio</Link>
          <Link href="/normativa" className="footer-link">Normativa</Link>
          <Link href="/faq" className="footer-link">FAQ</Link>
          <Link href="/galeria" className="footer-link">Galería</Link>
          <Link href="/guia" className="footer-link">Guía de Inicio</Link>
        </div>
        <div className="store-footer-col">
          <h4>Legal</h4>
          <Link href="/terminos" className="footer-link">Términos y Condiciones</Link>
        </div>
        <div className="store-footer-col">
          <h4>Redes Sociales</h4>
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
      <div className="store-footer-bottom">
        <p>© 2026 AstralixRoleplay. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

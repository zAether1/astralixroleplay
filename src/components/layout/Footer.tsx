import Link from "next/link";

export function Footer() {
  return (
    <footer className="landing-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link href="/" className="navbar-logo-link">
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>Astralix<span style={{ color: 'var(--color-accent)'}}>Roleplay</span></span>
          </Link>
          <p className="footer-tagline">La experiencia roleplay que estabas buscando.</p>
        </div>
        
        <div className="footer-links-group">
          <h4 className="footer-links-title">Navegación</h4>
          <Link href="/" className="footer-link">Inicio</Link>
          <Link href="/tienda" className="footer-link">Tienda</Link>
          <Link href="/rules" className="footer-link">Normativa</Link>
          <Link href="/faq" className="footer-link">FAQ</Link>
        </div>
        
        <div className="footer-links-group">
          <h4 className="footer-links-title">Legal</h4>
          <Link href="/terms" className="footer-link">Términos y Condiciones</Link>
          <Link href="/privacy" className="footer-link">Privacidad</Link>
        </div>
        
        <div className="footer-links-group">
          <h4 className="footer-links-title">Redes Sociales</h4>
          <a href="#" className="footer-link"><i className="fa-brands fa-discord"></i> Discord</a>
          <a href="#" className="footer-link"><i className="fa-brands fa-twitter"></i> Twitter</a>
          <a href="#" className="footer-link"><i className="fa-brands fa-instagram"></i> Instagram</a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <span className="footer-copyright">© {new Date().getFullYear()} AstralixRoleplay. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
}

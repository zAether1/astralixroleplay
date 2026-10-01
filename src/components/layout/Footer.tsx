import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="landing-footer" style={{ marginTop: '4rem', padding: '3rem 2rem 1.5rem', background: '#0a0a0c', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="footer-inner" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', maxWidth: '1200px', margin: '0 auto', paddingBottom: '3rem' }}>
        <div className="footer-brand">
          <Image
            src="/assets/original/logo.png"
            alt="AstralixRoleplay Logo"
            width={120}
            height={120}
            className="footer-logo"
            style={{ width: '80px', height: 'auto', marginBottom: '1rem' }}
          />
          <p className="footer-tagline">
            Tienda oficial de AstralixRoleplay.<br />
            Los mejores productos para tu experiencia Roleplay.
          </p>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-links-title">NAVEGACIÓN</h4>
          <Link href="/" className="footer-link">
            <i className="fa-solid fa-house"></i> Inicio
          </Link>
          <Link href="/tienda" className="footer-link">
            <i className="fa-solid fa-shop"></i> Tienda
          </Link>
          <Link href="#" className="footer-link">
            <i className="fa-solid fa-newspaper"></i> Noticias
          </Link>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-links-title">LEGAL</h4>
          <Link href="#" className="footer-link">Términos y Condiciones</Link>
          <Link href="#" className="footer-link">Política de Privacidad</Link>
          <Link href="#" className="footer-link">Aviso Legal</Link>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-links-title">SOPORTE</h4>
          <a href="#" className="footer-link">
            <i className="fa-brands fa-discord"></i> Discord
          </a>
          <a href="#" className="footer-link">
            <i className="fa-solid fa-envelope"></i> Contacto
          </a>
        </div>
      </div>

      <div className="footer-bottom" style={{ textAlign: 'center', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
        <p className="footer-copyright">
          ASTRALIX ROLEPLAY © 2024. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

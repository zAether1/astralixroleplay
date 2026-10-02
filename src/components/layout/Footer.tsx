"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="landing-footer" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))', marginTop: '4rem', padding: '5rem 2rem 0' }}>
      <div className="footer-inner" style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', paddingBottom: '4rem' }}>
        <div className="footer-brand" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', gridColumn: '1 / -1', '@media (min-width: 768px)': { gridColumn: 'auto' } } as any}>
          <Link href="/tienda" style={{ display: 'inline-block' }}>
            <img src="/AstralixRPV1.png" alt="Astralix Roleplay" style={{ height: '3.5rem', width: 'auto', filter: 'drop-shadow(0 0 10px rgba(var(--color-accent-rgb), 0.2))', transition: 'filter 0.3s' }} onMouseOver={e => e.currentTarget.style.filter = 'drop-shadow(0 0 20px rgba(var(--color-accent-rgb), 0.4))'} onMouseOut={e => e.currentTarget.style.filter = 'drop-shadow(0 0 10px rgba(var(--color-accent-rgb), 0.2))'} />
          </Link>
          <p className="footer-tagline" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '300px' }}>
            La experiencia roleplay definitiva. Economía realista, scripts propios y la mejor comunidad.
          </p>
        </div>
        
        <div className="footer-links-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <h4 className="footer-links-title" style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Navegación</h4>
          <Link href="/tienda" className="footer-link" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }} onMouseOver={e => e.currentTarget.style.color = 'var(--color-accent)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
            <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.7rem', opacity: 0.5 }}></i> Inicio
          </Link>
          <Link href="/normativa" className="footer-link" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }} onMouseOver={e => e.currentTarget.style.color = 'var(--color-accent)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
            <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.7rem', opacity: 0.5 }}></i> Normativa
          </Link>
          <Link href="/faq" className="footer-link" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }} onMouseOver={e => e.currentTarget.style.color = 'var(--color-accent)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
            <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.7rem', opacity: 0.5 }}></i> FAQ
          </Link>
          <Link href="/galeria" className="footer-link" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }} onMouseOver={e => e.currentTarget.style.color = 'var(--color-accent)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
            <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.7rem', opacity: 0.5 }}></i> Galería
          </Link>
          <Link href="/guia" className="footer-link" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }} onMouseOver={e => e.currentTarget.style.color = 'var(--color-accent)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
            <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.7rem', opacity: 0.5 }}></i> Guía de Inicio
          </Link>
        </div>

        <div className="footer-links-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <h4 className="footer-links-title" style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Legal</h4>
          <Link href="/terminos" className="footer-link" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }} onMouseOver={e => e.currentTarget.style.color = 'var(--color-accent)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
            <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.7rem', opacity: 0.5 }}></i> Términos y Condiciones
          </Link>
        </div>

        <div className="footer-links-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <h4 className="footer-links-title" style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Enlaces</h4>
          <Link href="/tienda" className="footer-link" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }} onMouseOver={e => e.currentTarget.style.color = 'var(--color-accent)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
            <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
              <i className="fa-solid fa-store" style={{ fontSize: '0.8rem' }}></i>
            </div>
            Tienda
          </Link>
          <a href="https://discord.gg/astralixrp" className="footer-link" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }} onMouseOver={e => e.currentTarget.style.color = '#5865F2'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
            <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(88, 101, 242, 0.1)', borderRadius: '4px' }}>
              <i className="fa-brands fa-discord" style={{ fontSize: '0.9rem', color: '#5865F2' }}></i>
            </div>
            Discord
          </a>
          <a href="https://www.tiktok.com/@astralixrp" className="footer-link" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
            <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
              <i className="fa-brands fa-tiktok" style={{ fontSize: '0.9rem' }}></i>
            </div>
            TikTok
          </a>
        </div>
      </div>
      
      <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem 2rem', textAlign: 'center' }}>
        <p className="footer-copyright" style={{ color: 'var(--color-text-disabled)', fontSize: '0.85rem', margin: 0, fontFamily: 'var(--font-mono)' }}>
          © 2026 AstralixRoleplay. Todos los derechos reservados. No afiliado con Rockstar Games, Take-Two Interactive u otros derechos relacionados.
        </p>
      </div>
    </footer>
  );
}

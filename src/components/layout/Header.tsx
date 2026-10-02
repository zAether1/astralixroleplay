"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart/store";

export function Header() {
  const pathname = usePathname();
  const { itemCount, setIsDrawerOpen } = useCart();

  return (
    <header className="navbar navbar--solid navbar--landing" style={{ padding: '0 2rem', background: 'rgba(10, 10, 10, 0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <div className="navbar-inner" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', height: '5rem', maxWidth: '80rem', margin: '0 auto' }}>
        
        {/* Left side */}
        <div className="navbar-left" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="https://astralixrp.lat" className="navbar-pill" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-accent)', fontWeight: 600, fontSize: '0.85rem', padding: '0.5rem 0.8rem', transition: 'opacity 0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = '0.8'} onMouseOut={e => e.currentTarget.style.opacity = '1'}>
            <i className="fa-solid fa-chevron-left" style={{ fontSize: '0.7rem' }}></i> WEB
          </a>
          <Link href="/tienda" className={`navbar-pill ${pathname === '/tienda' || pathname === '/' ? 'navbar-pill--active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
            <i className="fa-solid fa-house" style={{ color: pathname === '/tienda' || pathname === '/' ? 'var(--color-accent)' : 'var(--color-text-muted)' }}></i> INICIO
          </Link>
        </div>
        
        {/* Center - Logo */}
        <div className="navbar-center" style={{ display: 'flex', justifyContent: 'center' }}>
          <Link href="/tienda" style={{ display: 'flex', alignItems: 'center', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
              <img src="/AstralixRPV1.png" alt="Astralix Roleplay" style={{ height: '2.8rem', width: 'auto', filter: 'drop-shadow(0 0 15px rgba(var(--color-accent-rgb), 0.3))' }} />
          </Link>
        </div>
        
        {/* Right side */}
        <div className="navbar-right" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem' }}>
          <button 
            className="navbar-pill navbar-pill--store" 
            onClick={() => setIsDrawerOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(var(--color-accent-rgb), 0.08)', border: '1px solid rgba(var(--color-accent-rgb), 0.2)', padding: '0.5rem 1.2rem', borderRadius: 'var(--radius-xl)' }}
          >
            <i className="fa-solid fa-cart-shopping"></i>
            {itemCount > 0 && <span style={{ fontWeight: 800 }}>{itemCount}</span>}
          </button>
          
          <button 
            className="navbar-pill"
            onClick={() => alert("¡Bienvenido! El inicio de sesión y la vinculación de cuenta (Discord/FiveM) se realizan automáticamente durante el proceso de pago seguro a través de Tip4Serv.")}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.5rem 1.2rem', borderRadius: 'var(--radius-xl)', transition: 'all 0.2s', cursor: 'pointer' }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
          >
            <i className="fa-solid fa-user" style={{ color: 'var(--color-accent)' }}></i> INICIAR SESIÓN
          </button>
        </div>
      </div>
    </header>
  );
}

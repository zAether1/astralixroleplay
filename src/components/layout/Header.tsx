"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart/store";

export function Header() {
  const pathname = usePathname();
  const { itemCount, setIsDrawerOpen } = useCart();

  return (
    <nav className="navbar navbar--landing navbar--solid">
      <div className="navbar-inner">
        <div className="navbar-links" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#" className="navbar-pill" style={{ color: 'var(--color-accent)', fontWeight: 800, letterSpacing: '1px' }}>
            <i className="fa-solid fa-arrow-left"></i> WEB
          </a>
          <Link href="/" className="navbar-pill navbar-pill--active">
            <i className="fa-solid fa-house"></i> INICIO
          </Link>
        </div>
        
        <div className="navbar-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a href="#" className="navbar-pill" style={{ color: 'var(--color-text)' }}>
            <i className="fa-brands fa-discord"></i>
          </a>
          <button 
            className="navbar-cart" 
            onClick={() => setIsDrawerOpen(true)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-accent)', fontSize: '1.2rem', padding: '0.5rem' }}
          >
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
          <a href="#" className="navbar-pill" style={{ color: 'var(--color-accent)', fontWeight: 800, marginLeft: '1rem' }}>
            <i className="fa-solid fa-user"></i> INICIAR SESIÓN
          </a>
        </div>
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart/store";

export function Header() {
  const pathname = usePathname();
  const { items, setIsDrawerOpen } = useCart();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar navbar--landing navbar--solid">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <Link href="/" className="navbar-logo-link">
            {/* Logo Placeholder */}
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>Astralix<span style={{ color: 'var(--color-accent)'}}>Roleplay</span></span>
          </Link>
        </div>
        
        <div className="navbar-links">
          {/* <div className="navbar-slider"></div> */}
          <Link href="/" className={`navbar-pill ${pathname === "/" ? "navbar-pill--active" : ""}`}>
            Inicio
          </Link>
          <Link href="/tienda" className={`navbar-pill ${pathname?.startsWith("/tienda") ? "navbar-pill--active" : ""}`}>
            Tienda
          </Link>
          <Link href="/rules" className={`navbar-pill ${pathname === "/rules" ? "navbar-pill--active" : ""}`}>
            Normativa
          </Link>
          <Link href="/faq" className={`navbar-pill ${pathname === "/faq" ? "navbar-pill--active" : ""}`}>
            FAQ
          </Link>
        </div>

        <div className="navbar-actions">
          <button onClick={() => setIsDrawerOpen(true)} className="navbar-pill--store">
            <i className="fa-solid fa-cart-shopping"></i> Carrito {itemCount > 0 && `(${itemCount})`}
          </button>
        </div>

        <button className="navbar-hamburger">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

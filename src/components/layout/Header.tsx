"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart/store";

export function Header() {
  const pathname = usePathname();
  const { itemCount, setIsDrawerOpen } = useCart();

  return (
    <header className="navbar navbar--solid navbar--landing">
      <div className="navbar-inner">
        <a href="https://astralixrp.lat" className="navbar-pill">
          <i className="fa-solid fa-arrow-left"></i> WEB
        </a>
        
        <div className="navbar-brand">
            <Link href="/tienda">
                <img src="/logo.png" alt="Astralix Roleplay" className="navbar-logo" />
            </Link>
        </div>

        <div className="navbar-links">
          <Link 
            href="/tienda" 
            className={`navbar-pill ${pathname === '/tienda' || pathname === '/' ? 'navbar-pill--active' : ''}`}
          >
            <i className="fa-solid fa-house"></i> INICIO
          </Link>
          <a href="https://discord.gg/astralixrp" className="navbar-pill" target="_blank" rel="noopener noreferrer">
             DISCORD
          </a>
        </div>
        
        <div className="navbar-actions">
          <button className="navbar-pill navbar-pill--store" onClick={() => setIsDrawerOpen(true)}>
            <i className="fa-solid fa-cart-shopping"></i>
            {itemCount > 0 && <span>{itemCount}</span>}
          </button>
          <button className="navbar-pill">
            <i className="fa-solid fa-user"></i> INICIAR SESIÓN
          </button>
        </div>
      </div>
    </header>
  );
}

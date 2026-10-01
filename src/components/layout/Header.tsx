"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart/store";

export function Header() {
  const pathname = usePathname();
  const { itemCount, setIsDrawerOpen } = useCart();

  return (
    <header className="store-header">
      <div className="store-header-container">
        <a href="https://astralixrp.lat" className="store-header-link">
          <i className="fa-solid fa-arrow-left"></i> WEB
        </a>
        <Link 
          href="/tienda" 
          className={`store-header-link ${pathname === '/tienda' || pathname === '/' ? 'store-header-link--active' : ''}`}
        >
          <i className="fa-solid fa-house"></i> INICIO
        </Link>
        <div className="store-header-right">
          <a href="https://discord.gg/astralixrp" className="store-header-icon" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-discord"></i>
          </a>
          <button className="store-header-icon" onClick={() => setIsDrawerOpen(true)}>
            <i className="fa-solid fa-cart-shopping"></i>
            {itemCount > 0 && <span className="store-badge">{itemCount}</span>}
          </button>
          <button className="store-header-login">
            <i className="fa-solid fa-user"></i> INICIAR SESIÓN
          </button>
        </div>
      </div>
    </header>
  );
}

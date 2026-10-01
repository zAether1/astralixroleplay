"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart/store";

export function Header() {
  const pathname = usePathname();
  const { itemCount, setIsDrawerOpen } = useCart();

  return (
    <header className="store-header">
      <div className="store-header-left">
        <a className="store-header-link" href="#">
          <i className="fa-solid fa-arrow-left"></i> WEB
        </a>
        <Link className={`store-header-link ${pathname === '/' || pathname.startsWith('/tienda') ? 'store-header-link--active' : ''}`} href="/tienda">
          <i className="fa-solid fa-house"></i> INICIO
        </Link>
      </div>
      <div className="store-header-right">
        <a className="store-header-icon" href="#" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-discord"></i>
        </a>
        <button className="store-header-icon" onClick={() => setIsDrawerOpen(true)}>
          <i className="fa-solid fa-cart-shopping"></i>
          {itemCount > 0 && <span className="store-header-badge">{itemCount}</span>}
        </button>
        <button className="store-header-login">
          <i className="fa-solid fa-user"></i> INICIAR SESIÓN
        </button>
      </div>
    </header>
  );
}

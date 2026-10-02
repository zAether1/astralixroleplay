"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart/store";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SignIn } from "@/components/ui/sign-in";

export function Header() {
  const pathname = usePathname();
  const { itemCount, setIsDrawerOpen } = useCart();

  const [isAuth, setIsAuth] = useState(false);
  const [isTip4ServReady, setIsTip4ServReady] = useState(false);

  useEffect(() => {
    // Polling to wait for Tip4Serv.js to load
    const checkT4S = setInterval(() => {
      const t4s = (window as any).Tip4Serv || (window as any).Tip4serv;
      if (t4s && t4s.OAuth) {
        setIsTip4ServReady(true);
        const token = t4s.OAuth.Token();
        if (token) {
          setIsAuth(true);
        }
        clearInterval(checkT4S);
      }
    }, 200);

    return () => clearInterval(checkT4S);
  }, []);

  const handleLoginClick = () => {
    const t4s = (window as any).Tip4Serv || (window as any).Tip4serv;
    if (t4s && t4s.OAuth) {
      t4s.OAuth.Connect({ return_url: window.location.origin + "/tienda" });
    } else {
      console.warn("Tip4Serv script is not fully loaded yet.");
    }
  };

  const handleProfileClick = () => {
    // The official docs don't mention a specific built-in profile UI, 
    // but the user is logged in. We can just alert them for now or redirect to Tip4Serv.
    alert("Sesión iniciada correctamente.");
  };

  return (
    <header className="navbar navbar--solid navbar--landing" style={{ padding: '0 2rem', background: 'rgba(10, 10, 10, 0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <div className="navbar-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '5rem', maxWidth: '80rem', margin: '0 auto' }}>
        
        {/* Left side */}
        <div className="navbar-left" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="https://astralixrp.lat" className="navbar-pill" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-accent)', fontWeight: 600, fontSize: '0.85rem', padding: '0.5rem 0.8rem', transition: 'opacity 0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = '0.8'} onMouseOut={e => e.currentTarget.style.opacity = '1'}>
            <i className="fa-solid fa-chevron-left" style={{ fontSize: '0.7rem' }}></i> WEB
          </a>
          <Link href="/tienda" className={`navbar-pill ${pathname === '/tienda' || pathname === '/' ? 'navbar-pill--active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
            <i className="fa-solid fa-house" style={{ color: pathname === '/tienda' || pathname === '/' ? 'var(--color-accent)' : 'var(--color-text-muted)' }}></i> INICIO
          </Link>
        </div>
        
        {/* Right side */}
        <div className="navbar-right" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem' }}>
          <a href="https://discord.gg/astralixrp" target="_blank" rel="noopener noreferrer" className="navbar-pill" style={{ display: 'flex', alignItems: 'center', color: 'var(--color-accent)', fontSize: '1rem', padding: '0.5rem', transition: 'opacity 0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = '0.8'} onMouseOut={e => e.currentTarget.style.opacity = '1'}>
            <i className="fa-brands fa-discord"></i>
          </a>
          
          <button 
            className="navbar-pill navbar-pill--store" 
            onClick={() => setIsDrawerOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(var(--color-accent-rgb), 0.08)', border: '1px solid rgba(var(--color-accent-rgb), 0.2)', padding: '0.5rem 1.2rem', borderRadius: 'var(--radius-xl)' }}
          >
            <i className="fa-solid fa-cart-shopping"></i>
            {itemCount > 0 && <span style={{ fontWeight: 800 }}>{itemCount}</span>}
          </button>
          
          {isAuth ? (
            <button 
              className="navbar-pill"
              onClick={handleProfileClick}
              disabled={!isTip4ServReady}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, 
                color: 'var(--color-success)', 
                border: '1px solid rgba(0, 201, 128, 0.2)', 
                background: 'rgba(0, 201, 128, 0.05)',
                padding: '0.5rem 1.2rem', borderRadius: 'var(--radius-xl)', transition: 'all 0.2s', 
                cursor: 'pointer',
                opacity: 1
              }}
            >
              <i className="fa-solid fa-user-check" style={{ color: 'var(--color-success)' }}></i> CONECTADO
            </button>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <button 
                  className="navbar-pill"
                  disabled={!isTip4ServReady}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, 
                    color: 'var(--color-text)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    background: 'transparent',
                    padding: '0.5rem 1.2rem', borderRadius: 'var(--radius-xl)', transition: 'all 0.2s', 
                    cursor: isTip4ServReady ? 'pointer' : 'wait',
                    opacity: isTip4ServReady ? 1 : 0.6
                  }}
                >
                  <i className="fa-solid fa-user" style={{ color: 'var(--color-accent)' }}></i> INICIAR SESIÓN
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-transparent border-none p-0 flex justify-center">
                <SignIn onLoginClick={handleLoginClick} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </header>
  );
}

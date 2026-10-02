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
import { Home, ShoppingCart, UserCheck, User, ShieldCheck } from "lucide-react";
import { FaDiscord } from "react-icons/fa";

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
    alert("Sesión iniciada correctamente.");
  };

  const isHome = pathname === '/tienda' || pathname === '/';

  return (
    <header style={{ 
      position: 'sticky', top: 0, zIndex: 100,
      padding: '0 2rem', 
      background: 'rgba(10, 10, 10, 0.85)', 
      backdropFilter: 'blur(20px)', 
      borderBottom: '1px solid rgba(255, 255, 255, 0.06)' 
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4.5rem', maxWidth: '80rem', margin: '0 auto' }}>
        
        {/* Left side — Logo + INICIO */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <Link href="/tienda" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="/AstralixRPV1.png" alt="Astralix" style={{ height: '2rem', width: 'auto' }} />
          </Link>
          <div style={{ width: '1px', height: '1.5rem', background: 'rgba(255,255,255,0.1)' }} />
          <Link 
            href="/tienda" 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.4rem', 
              fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.04em',
              color: isHome ? '#fff' : 'rgba(255,255,255,0.5)',
              transition: 'color 0.2s'
            }}
          >
            <Home size={16} style={{ color: isHome ? '#9000FA' : 'rgba(255,255,255,0.4)' }} />
            INICIO
          </Link>
        </div>
        
        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Discord */}
          <a 
            href="https://discord.gg/FxzZbefs9D" 
            target="_blank" rel="noopener noreferrer" 
            style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem',
              color: 'rgba(255,255,255,0.5)', 
              transition: 'all 0.2s',
              background: 'transparent'
            }} 
            onMouseOver={e => { e.currentTarget.style.color = '#5865F2'; e.currentTarget.style.background = 'rgba(88,101,242,0.1)'; }}
            onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'transparent'; }}
          >
            <FaDiscord size={18} />
          </a>

          {/* Cart */}
          <button 
            onClick={() => setIsDrawerOpen(true)}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.5rem', 
              padding: '0.5rem 1rem', borderRadius: '0.75rem',
              background: 'rgba(144, 0, 250, 0.08)', 
              border: '1px solid rgba(144, 0, 250, 0.2)',
              color: '#fff', fontSize: '0.85rem', fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(144, 0, 250, 0.15)'; e.currentTarget.style.borderColor = 'rgba(144, 0, 250, 0.35)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(144, 0, 250, 0.08)'; e.currentTarget.style.borderColor = 'rgba(144, 0, 250, 0.2)'; }}
          >
            <ShoppingCart size={16} />
            {itemCount > 0 && <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>{itemCount}</span>}
          </button>
          
          {/* Auth */}
          {isAuth ? (
            <button 
              onClick={handleProfileClick}
              disabled={!isTip4ServReady}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '0.4rem', 
                fontSize: '0.8rem', fontWeight: 600, 
                color: '#00c980',
                border: '1px solid rgba(0, 201, 128, 0.2)', 
                background: 'rgba(0, 201, 128, 0.06)',
                padding: '0.5rem 1rem', borderRadius: '0.75rem', 
                transition: 'all 0.2s', cursor: 'pointer'
              }}
            >
              <UserCheck size={16} /> CONECTADO
            </button>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <button 
                  disabled={!isTip4ServReady}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '0.4rem', 
                    fontSize: '0.8rem', fontWeight: 600, 
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.1)', 
                    background: 'transparent',
                    padding: '0.5rem 1rem', borderRadius: '0.75rem', 
                    transition: 'all 0.2s', 
                    cursor: isTip4ServReady ? 'pointer' : 'wait',
                    opacity: isTip4ServReady ? 1 : 0.5
                  }}
                  onMouseOver={e => { if(isTip4ServReady) { e.currentTarget.style.borderColor = 'rgba(144,0,250,0.3)'; e.currentTarget.style.background = 'rgba(144,0,250,0.06)'; }}}
                  onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  <User size={16} style={{ color: '#9000FA' }} /> INICIAR SESIÓN
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


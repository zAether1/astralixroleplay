"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart/store";
import { useState, useEffect, useRef, useCallback } from "react";
import { ShoppingCart, LogIn, X, UserCheck } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import gsap from "gsap";

export function Header() {
  const pathname = usePathname();
  const { itemCount, setIsDrawerOpen } = useCart();

  const [isAuth, setIsAuth] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [discordSession, setDiscordSession] = useState<{ username: string, avatar: string | null } | null>(null);

  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // 1. Fetch Discord Session
    const checkDiscordAuth = async () => {
      try {
        const res = await fetch("/api/auth/session");
        if (res.ok) {
          const data = await res.json();
          if (data.session) {
            setDiscordSession(data.session);
            setIsAuth(true); // Using Discord auth instead
          }
        }
      } catch (err) {
        console.error("Failed to fetch session", err);
      }
    };
    checkDiscordAuth();
  }, []);

  const handleLoginClick = useCallback(() => {
    setIsConnecting(true);
    // Redirect to our new Discord OAuth login route
    window.location.href = "/api/auth/discord/login";
  }, []);

  const handleLogoutClick = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setDiscordSession(null);
      setIsAuth(false);
      window.location.reload();
    } catch (err) {
      console.error("Logout failed", err);
    }
  }, []);

  const openLogin = useCallback(() => {
    setIsLoginOpen(true);
    setIsConnecting(false);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => {
      if (overlayRef.current && modalRef.current) {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
        gsap.fromTo(modalRef.current, { opacity: 0, scale: 0.92, y: 16 }, { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "back.out(1.4)" });
      }
    });
  }, []);

  const closeLogin = useCallback(() => {
    if (overlayRef.current && modalRef.current) {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: "power2.in" });
      gsap.to(modalRef.current, {
        opacity: 0, scale: 0.92, y: 10, duration: 0.2, ease: "power2.in",
        onComplete: () => {
          setIsLoginOpen(false);
          document.body.style.overflow = "";
        }
      });
    } else {
      setIsLoginOpen(false);
      document.body.style.overflow = "";
    }
  }, []);

  const isHome = pathname === "/tienda" || pathname === "/";

  return (
    <>
      {/* ═══════════════════ NAVBAR ═══════════════════ */}
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
          background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            height: "3.6rem", maxWidth: "82rem", margin: "0 auto", padding: "0 2rem",
          }}
        >
          {/* ── LEFT NAV ── */}
          <nav style={{ display: "flex", alignItems: "center", gap: "0.15rem" }}>
            <Link
              href="/tienda"
              style={{
                display: "flex", alignItems: "center", gap: "0.45rem",
                padding: "0.4rem 0.9rem", borderRadius: "6px",
                fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                color: isHome ? "#9000FA" : "rgba(255,255,255,0.45)",
                textDecoration: "none", transition: "color 0.2s",
              }}
            >
              <i className="fa-solid fa-house" style={{ fontSize: "0.72rem" }} />
              INICIO
            </Link>
          </nav>

          {/* ── RIGHT ACTIONS ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            {/* Discord */}
            <a
              href="https://discord.gg/FxzZbefs9D"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "2.2rem", height: "2.2rem", borderRadius: "6px",
                color: "rgba(255,255,255,0.4)", transition: "all 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#5865F2")}
              onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            >
              <FaDiscord size={16} />
            </a>

            {/* Cart */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "2.2rem", height: "2.2rem", borderRadius: "6px",
                background: "none", border: "none",
                color: "rgba(255,255,255,0.4)", cursor: "pointer", transition: "all 0.2s",
                position: "relative",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#9000FA")}
              onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            >
              <ShoppingCart size={16} />
              {itemCount > 0 && (
                <span
                  style={{
                    position: "absolute", top: "2px", right: "2px",
                    width: "14px", height: "14px", borderRadius: "50%",
                    background: "#9000FA", color: "#fff",
                    fontSize: "0.6rem", fontWeight: 800,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    lineHeight: 1,
                  }}
                >
                  {itemCount}
                </span>
              )}
            </button>

            {/* Auth */}
            {isAuth ? (
              <button
                onClick={handleLogoutClick}
                title="Cerrar sesión"
                style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  padding: "0.35rem 0.85rem", borderRadius: "6px",
                  fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                  color: "#00c980", background: "none", border: "none", cursor: "pointer",
                  transition: "opacity 0.2s",
                }}
              >
                {discordSession?.avatar ? (
                  <img src={discordSession.avatar} alt="Avatar" style={{ width: "20px", height: "20px", borderRadius: "50%" }} />
                ) : (
                  <UserCheck size={14} />
                )}
                {discordSession ? discordSession.username : "CONECTADO"}
              </button>
            ) : (
              <button
                onClick={openLogin}
                style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  padding: "0.35rem 0.85rem", borderRadius: "6px",
                  fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                  color: "#9000FA", background: "none", border: "none",
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                }}
                onMouseOver={(e) => { e.currentTarget.style.opacity = "0.7"; }}
                onMouseOut={(e) => { e.currentTarget.style.opacity = "1"; }}
              >
                <LogIn size={14} /> INICIAR SESIÓN
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ═══════════════════ LOGIN MODAL ═══════════════════ */}
      {isLoginOpen && (
        <div
          ref={overlayRef}
          onClick={(e) => { if (e.target === e.currentTarget) closeLogin(); }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: 0,
          }}
        >
          <div
            ref={modalRef}
            style={{
              position: "relative",
              width: "100%", maxWidth: "380px", margin: "0 1rem",
              background: "rgba(20,20,20,0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "2.5rem 2rem 2rem",
              display: "flex", flexDirection: "column", alignItems: "center",
              opacity: 0,
            }}
          >
            {/* Close */}
            <button
              onClick={closeLogin}
              style={{
                position: "absolute", top: "0.8rem", right: "0.8rem",
                background: "none", border: "none",
                color: "rgba(255,255,255,0.35)", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "2rem", height: "2rem", borderRadius: "6px",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
              onMouseOut={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.35)"; e.currentTarget.style.background = "none"; }}
            >
              <X size={18} />
            </button>

            {/* Logo */}
            <img
              src="/AstralixRPV1.png"
              alt="AstralixRoleplay"
              style={{ height: "4rem", width: "auto", marginBottom: "1.5rem", filter: "drop-shadow(0 0 16px rgba(144,0,250,0.35))" }}
            />

            {/* Title */}
            <h2
              style={{
                fontSize: "1.3rem", fontWeight: 800, color: "#fff",
                letterSpacing: "-0.01em", margin: "0 0 0.6rem", textAlign: "center",
              }}
            >
              Iniciar Sesión
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.55,
                textAlign: "center", margin: "0 0 1.8rem", maxWidth: "280px",
              }}
            >
              Inicia sesión con tu cuenta de Discord para acceder a la tienda y realizar compras.
            </p>

            {/* Login Button */}
            <button
              onClick={handleLoginClick}
              disabled={isConnecting}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                width: "100%", padding: "0.85rem 1.5rem", borderRadius: "8px",
                background: "#9000FA", border: "none",
                color: "#fff", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.02em",
                cursor: isConnecting ? "wait" : "pointer",
                opacity: isConnecting ? 0.7 : 1,
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => { 
                if (!isConnecting) { 
                  e.currentTarget.style.background = "#a020ff"; 
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(144,0,250,0.4)"; 
                }
              }}
              onMouseOut={(e) => { 
                if (!isConnecting) {
                  e.currentTarget.style.background = "#9000FA"; 
                  e.currentTarget.style.boxShadow = "none"; 
                }
              }}
            >
              {isConnecting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ animation: "spin 1s linear infinite" }}>
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Conectando...
                </>
              ) : (
                <>
                  <FaDiscord size={16} />
                  Iniciar sesión con Discord
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

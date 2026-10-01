"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, MessageSquare } from "lucide-react";
import MobileNavigation from "./MobileNavigation";
import CartDrawer from "../cart/CartDrawer";
import { useCart } from "@/lib/cart/store";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/tienda", label: "Tienda", isStore: true },
];

export default function Header() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const isLanding = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ─── Slider pill effect ─── */
  const updateSlider = useCallback(() => {
    if (!sliderRef.current || !navRef.current) return;

    const activeIndex = NAV_LINKS.findIndex(
      (link) =>
        pathname === link.href ||
        (link.href !== "/" && pathname.startsWith(link.href))
    );

    if (activeIndex < 0) {
      sliderRef.current.style.opacity = "0";
      return;
    }

    const pill = pillRefs.current[activeIndex];
    if (!pill) return;

    const navRect = navRef.current.getBoundingClientRect();
    const pillRect = pill.getBoundingClientRect();

    sliderRef.current.style.opacity = "1";
    sliderRef.current.style.width = `${pillRect.width}px`;
    sliderRef.current.style.transform = `translateY(-50%) translateX(${pillRect.left - navRect.left}px)`;
  }, [pathname]);

  useEffect(() => {
    updateSlider();
    window.addEventListener("resize", updateSlider);
    return () => window.removeEventListener("resize", updateSlider);
  }, [updateSlider]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[500] px-4 md:px-8 border-b transition-all duration-300 ${
          isScrolled || !isLanding
            ? "bg-[#180228]/85 backdrop-blur-[16px] border-white/[0.06] shadow-[0_1px_12px_rgba(0,0,0,0.3)]"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-[80rem] mx-auto flex items-center h-[4.4rem] gap-6 relative">
          {/* Brand */}
          <Link href="/" className="flex-shrink-0 flex items-center hover:opacity-85 transition-opacity z-20">
            <span className="font-display font-bold text-[1.4rem] text-white tracking-tight">
              Astralix<span className="text-accent drop-shadow-[0_0_8px_rgba(144,0,250,0.5)]">Roleplay</span>
            </span>
          </Link>

          {/* Desktop Navigation with slider */}
          <nav
            ref={navRef}
            className="hidden md:flex relative items-center gap-[0.15rem] flex-1 justify-center"
          >
            {/* Sliding pill background */}
            <div
              ref={sliderRef}
              className="absolute top-1/2 left-0 h-[2.1rem] bg-accent/10 border border-accent/15 rounded-full transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-none z-0 opacity-0"
            />

            {NAV_LINKS.map((link, i) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              if (link.isStore) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    ref={(el) => { pillRefs.current[i] = el; }}
                    className={`relative z-[1] inline-flex items-center gap-[0.45rem] font-body text-[0.85rem] font-semibold tracking-[0.01em] px-4 py-[0.4rem] rounded-full whitespace-nowrap transition-all duration-200 border ${
                      isActive
                        ? "text-accent border-accent/20"
                        : "text-accent border-accent/20 hover:bg-accent/10 hover:border-accent/35 hover:shadow-[0_0_12px_rgba(144,0,250,0.1)]"
                    }`}
                  >
                    <ShoppingCart size={13} />
                    {link.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(el) => { pillRefs.current[i] = el; }}
                  className={`relative z-[1] font-body text-[0.85rem] font-medium tracking-[0.01em] px-[0.95rem] py-[0.4rem] rounded-full whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "text-accent"
                      : "text-text-muted hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0 z-20">
            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-white/5 transition-colors text-text-muted hover:text-white relative group"
            >
              <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 bg-accent text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-[0_0_8px_rgba(144,0,250,0.6)]">
                  {itemCount}
                </span>
              )}
            </button>
            <a
              href="https://discord.gg/astralixroleplay"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-display text-[0.8rem] font-bold uppercase tracking-widest text-white bg-discord/90 border border-discord/50 rounded-lg px-5 py-2.5 transition-all hover:bg-discord hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(88,101,242,0.4)]"
            >
              <MessageSquare size={14} />
              Discord
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex items-center justify-center p-2 text-text-muted hover:text-white transition-colors z-20 ml-auto"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      {/* Drawers */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenCart={() => {
          setMobileMenuOpen(false);
          setCartOpen(true);
        }}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </>
  );
}

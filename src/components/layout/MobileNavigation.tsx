"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ShoppingCart, MessageSquare, Home, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart/store";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCart: () => void;
}

const MOBILE_LINKS = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/tienda", label: "Tienda", icon: ShoppingBag },
];

export default function MobileNavigation({ isOpen, onClose, onOpenCart }: MobileNavigationProps) {
  const pathname = usePathname();
  const { itemCount } = useCart();

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[998] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[999] w-full max-w-sm bg-bg border-l border-white/5 p-6 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <span className="font-display font-bold text-xl text-white tracking-tight">
            Astralix<span className="text-accent">Roleplay</span>
          </span>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-white transition-colors rounded-lg hover:bg-white/5"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {MOBILE_LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`flex items-center gap-3 text-lg font-medium px-4 py-3.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-accent bg-accent/10 border border-accent/20"
                    : "text-text-secondary hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <link.icon size={20} className={isActive ? "text-accent" : ""} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="mt-auto flex flex-col gap-4 pt-8 border-t border-white/5">
          <button
            onClick={onOpenCart}
            className="flex items-center justify-between w-full text-text-secondary hover:text-white px-4 py-3.5 rounded-xl hover:bg-white/5 transition-colors"
          >
            <span className="font-medium text-lg">Carrito</span>
            <div className="flex items-center gap-2">
              {itemCount > 0 && (
                <span className="bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-[0_0_6px_rgba(144,0,250,0.4)]">
                  {itemCount}
                </span>
              )}
              <ShoppingCart size={20} />
            </div>
          </button>

          <a
            href="https://discord.gg/astralixroleplay"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 font-display text-[0.95rem] font-bold uppercase tracking-wider text-white border border-border-light rounded-xl px-5 py-3.5 transition-all hover:border-discord hover:bg-discord/10"
          >
            <MessageSquare size={18} className="text-discord" />
            Discord
          </a>
        </div>
      </div>
    </>
  );
}

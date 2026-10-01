"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart/store";
import { formatPrice } from "@/lib/tip4serv/normalizer";

export function CartDrawer() {
  const { items, removeItem, updateQuantity, itemCount, subtotal, clearCart, isDrawerOpen, setIsDrawerOpen } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    setIsCheckingOut(true);
    setCheckoutError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: items.map(item => ({
            product_id: item.productId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Error al procesar el checkout");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      setCheckoutError(err.message);
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[998] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 z-[999] w-full max-w-md bg-bg border-l border-white/5 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-surface">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
              <i className="fa-solid fa-cart-shopping text-accent text-lg"></i>
            </div>
            <div>
              <span className="font-display font-bold text-lg text-white block leading-tight">
                Carrito
              </span>
              <span className="text-[0.72rem] text-text-muted">{itemCount} productos</span>
            </div>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 text-text-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-5">
            <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-text-disabled">
              <i className="fa-solid fa-cart-shopping text-4xl opacity-50"></i>
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-display font-bold text-lg text-white">Tu carrito está vacío</h3>
              <p className="text-sm text-text-muted max-w-[16rem] mx-auto leading-relaxed">
                Añade algunos paquetes para comenzar tu experiencia VIP en AstralixRoleplay.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 custom-scrollbar">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 relative group">
                <div className="w-16 h-16 rounded-lg bg-[#1e0332] overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <i className="fa-solid fa-cart-shopping text-white/20 text-2xl"></i>
                  )}
                </div>
                
                <div className="flex-1 flex flex-col">
                  <h4 className="font-display font-bold text-[0.95rem] text-white line-clamp-1">{item.name}</h4>
                  <span className="text-accent font-bold mt-1">{formatPrice(item.price, item.currency)}</span>
                  
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex items-center gap-3 bg-white/5 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/10 text-text-muted hover:text-white transition-colors"
                      >
                        <i className="fa-solid fa-minus text-xs"></i>
                      </button>
                      <span className="text-[0.85rem] font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/10 text-text-muted hover:text-white transition-colors"
                      >
                        <i className="fa-solid fa-plus text-xs"></i>
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.productId)}
                      className="p-1.5 text-error/70 hover:text-error hover:bg-error/10 rounded-md transition-colors"
                    >
                      <i className="fa-solid fa-trash-can text-sm"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              onClick={clearCart}
              className="text-xs text-text-muted hover:text-white self-center mt-2 underline underline-offset-4"
            >
              Vaciar carrito
            </button>
          </div>
        )}

        <div className="px-6 py-5 border-t border-white/5 bg-surface flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-text-muted font-medium">Subtotal</span>
            <span className="font-display font-bold text-xl text-white">
              {formatPrice(subtotal, items[0]?.currency || "EUR")}
            </span>
          </div>
          
          {checkoutError && (
            <div className="text-error text-sm bg-error/10 border border-error/20 p-3 rounded-lg">
              {checkoutError}
            </div>
          )}

          <button
            disabled={items.length === 0 || isCheckingOut}
            onClick={handleCheckout}
            className={`w-full py-3.5 font-display font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2
              ${items.length === 0 
                ? "bg-white/10 text-text-muted cursor-not-allowed" 
                : "bg-accent text-white hover:brightness-110 hover:shadow-[0_0_15px_rgba(144,0,250,0.4)]"
              }`}
          >
            {isCheckingOut ? (
              <><i className="fa-solid fa-circle-notch fa-spin"></i> Procesando...</>
            ) : (
              "Proceder al Checkout"
            )}
          </button>
          <p className="text-center text-[0.7rem] text-text-disabled">
            Pago procesado de forma segura mediante Tip4Serv
          </p>
        </div>
      </div>
    </>
  );
}

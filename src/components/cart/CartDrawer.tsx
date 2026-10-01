"use client";

import { useCart } from "@/lib/cart/store";
import { useEffect } from "react";
import Image from "next/image";

export function CartDrawer() {
  const { 
    isDrawerOpen, 
    setIsDrawerOpen, 
    items, 
    removeItem, 
    updateQuantity
  } = useCart();

  const totalPrice = items.reduce((total, item) => total + (parseFloat(String(item.price) || "0") * item.quantity), 0);
  const currency = items.length > 0 ? items[0].currency : "EUR";

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  return (
    <>
      <div 
        className="store-cart-backdrop"
        style={{
          opacity: isDrawerOpen ? 1 : 0,
          pointerEvents: isDrawerOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        onClick={() => setIsDrawerOpen(false)}
      />

      <div 
        className="store-cart-drawer"
        style={{
          transform: isDrawerOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div className="store-cart-header">
          <h3>MI CARRITO</h3>
          <button 
            className="store-cart-close"
            onClick={() => setIsDrawerOpen(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="store-cart-items">
          {items.length === 0 ? (
            <div className="store-cart-empty">
              Tu carrito está vacío.
            </div>
          ) : (
            items.map((item) => (
              <div key={item.productId} className="store-cart-item">
                <img 
                  src={item.image || "https://placehold.co/100"} 
                  alt={item.name}
                  className="store-cart-item-img"
                />
                <div className="store-cart-item-info">
                  <div className="store-cart-item-header">
                    <span className="store-cart-item-name">{item.name}</span>
                    <button 
                      className="store-cart-item-remove"
                      onClick={() => removeItem(item.productId)}
                      style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', marginLeft: 'auto' }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                  <div className="store-cart-item-price-wrap" style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="store-cart-item-qty">
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                    <span className="store-cart-item-price">{item.price} {item.currency}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="store-cart-footer" style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 'auto' }}>
          <div className="store-cart-total" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 'bold' }}>
            <span>Total:</span>
            <span style={{ color: 'var(--color-accent)' }}>{totalPrice.toFixed(2)} {currency}</span>
          </div>
          <button 
            className="store-btn store-btn--primary" 
            style={{ width: '100%', padding: '0.8rem', fontWeight: 900, fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            disabled={items.length === 0}
            onClick={() => alert("Checkout flow - implement with Tip4Serv")}
          >
            <i className="fa-solid fa-lock"></i> PAGAR
          </button>
        </div>
      </div>
    </>
  );
}

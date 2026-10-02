"use client";

import { useCart } from "@/lib/cart/store";
import { useEffect, useState } from "react";
import Image from "next/image";

export function CartDrawer() {
  const { 
    isDrawerOpen, 
    setIsDrawerOpen, 
    items, 
    removeItem, 
    updateQuantity
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);

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

  const handleCheckout = () => {
    setIsDrawerOpen(false);
    window.location.href = "/tienda/checkout";
  };

  return (
    <>
      <div 
        className="store-cart-backdrop"
        style={{
          opacity: isDrawerOpen ? 1 : 0,
          pointerEvents: isDrawerOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000
        }}
        onClick={() => setIsDrawerOpen(false)}
      />

      <div 
        className="store-cart-drawer"
        style={{
          transform: isDrawerOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0, right: 0, bottom: 0,
          width: '100%',
          maxWidth: '400px',
          background: 'var(--color-bg)',
          borderLeft: '1px solid var(--color-border)',
          zIndex: 1001,
          boxShadow: '-10px 0 30px rgba(0,0,0,0.5)'
        }}
      >
        <div className="store-cart-header" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="fa-solid fa-cart-shopping" style={{ color: 'var(--color-accent)' }}></i> MI CARRITO
          </h3>
          <button 
            className="store-cart-close"
            onClick={() => setIsDrawerOpen(false)}
            style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: '1.2rem', cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseOver={e => e.currentTarget.style.color = 'var(--color-text)'}
            onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="store-cart-items" style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {items.length === 0 ? (
            <div className="store-cart-empty" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-muted)', gap: '1rem' }}>
              <i className="fa-solid fa-cart-arrow-down" style={{ fontSize: '3rem', opacity: 0.2 }}></i>
              <p>Tu carrito está vacío.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {items.map((item) => (
                <div key={item.productId} className="store-cart-item" style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <img 
                    src={item.image || "https://placehold.co/100"} 
                    alt={item.name}
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', background: 'rgba(0,0,0,0.5)' }}
                  />
                  <div className="store-cart-item-info" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div className="store-cart-item-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span className="store-cart-item-name" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text)', lineHeight: 1.2 }}>{item.name}</span>
                      <button 
                        className="store-cart-item-remove"
                        onClick={() => removeItem(item.productId)}
                        style={{ background: 'none', border: 'none', color: 'var(--color-error)', cursor: 'pointer', padding: '0.2rem', opacity: 0.7, transition: 'opacity 0.2s' }}
                        onMouseOver={e => e.currentTarget.style.opacity = '1'}
                        onMouseOut={e => e.currentTarget.style.opacity = '0.7'}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                    <div className="store-cart-item-price-wrap" style={{ marginTop: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="store-cart-item-qty" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'rgba(0,0,0,0.3)', padding: '0.3rem 0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          style={{ background: 'none', border: 'none', color: item.quantity <= 1 ? 'var(--color-text-disabled)' : 'var(--color-text)', cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer' }}
                        >
                          <i className="fa-solid fa-minus" style={{ fontSize: '0.7rem' }}></i>
                        </button>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          style={{ background: 'none', border: 'none', color: 'var(--color-text)', cursor: 'pointer' }}
                        >
                          <i className="fa-solid fa-plus" style={{ fontSize: '0.7rem' }}></i>
                        </button>
                      </div>
                      <span className="store-cart-item-price" style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.95rem' }}>{item.price} {item.currency}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="store-cart-footer" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid var(--color-border)', marginTop: 'auto' }}>
          <div className="store-cart-total" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', alignItems: 'center' }}>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Total a pagar:</span>
            <span style={{ color: 'var(--color-text)', fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>{totalPrice.toFixed(2)} {currency}</span>
          </div>
          <button 
            className="store-btn store-btn--primary" 
            style={{ 
              width: '100%', 
              padding: '1rem', 
              fontWeight: 800, 
              fontFamily: 'var(--font-display)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '0.6rem',
              fontSize: '1.05rem',
              borderRadius: 'var(--radius-md)',
              opacity: (items.length === 0 || isCheckingOut) ? 0.6 : 1,
              cursor: (items.length === 0 || isCheckingOut) ? 'not-allowed' : 'pointer'
            }}
            disabled={items.length === 0 || isCheckingOut}
            onClick={handleCheckout}
          >
            {isCheckingOut ? (
              <><i className="fa-solid fa-circle-notch fa-spin"></i> PROCESANDO...</>
            ) : (
              <><i className="fa-solid fa-lock"></i> PAGAR AHORA</>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

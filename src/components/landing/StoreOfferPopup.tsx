"use client";

import { useState, useEffect } from "react";

// Promotional popup matching the original template's store-offer-popup
// Fixed position bottom-right, dismissable, with CTA button

export function StoreOfferPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show popup after 2 seconds, matching original behavior
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="store-offer-popup">
      <button
        className="store-offer-close"
        onClick={() => setVisible(false)}
        aria-label="Cerrar"
      >
        <i className="fa-solid fa-xmark" />
      </button>
      <h4 className="store-offer-title">¡TIENDA NUEVA!</h4>
      <p className="store-offer-desc">
        Utiliza <strong>ASTRALIX30</strong> para obtener un 30% de descuento en
        todos los productos de la tienda!
      </p>
      <a
        className="store-offer-btn"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setVisible(false);
        }}
      >
        ¡LO QUIERO! <i className="fa-solid fa-arrow-right" />
      </a>
    </div>
  );
}

"use client";

import { Product } from "@/lib/tip4serv/types";
import { useCart } from "@/lib/cart/store";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      productId: Number(product.id),
      name: product.name,
      price: product.price,
      currency: product.currency || "EUR",
      quantity: 1,
      image: product.image,
    });
  };

  // Determine button text. For VIP it's usually "SUSCRIBIRSE", otherwise "COMPRAR"
  const isVip = product.name.toLowerCase().includes("vip");

  return (
    <div className="store-card">
      <div className="store-card-image">
        <img 
          src={product.image || "https://placehold.co/400x400/180228/9000FA?text=Astralix"} 
          alt={product.name} 
        />
      </div>
      <div className="store-card-body">
        <h3 className="store-card-title">{product.name}</h3>
        {product.description && (
          <p className="store-card-desc" dangerouslySetInnerHTML={{ __html: product.description.substring(0, 80) + '...' }}></p>
        )}
        <div className="store-card-footer">
          <span className="store-card-price">{product.price} {product.currency || "USD"}</span>
          <div className="store-card-actions">
            <button className="store-card-buy" onClick={handleAddToCart} title="Añadir al carrito">
              <i className="fa-solid fa-cart-shopping"></i> {isVip ? "SUSCRIBIRSE" : "COMPRAR"}
            </button>
            <button className="store-card-info" title="Ver detalles">
              <i className="fa-solid fa-info"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

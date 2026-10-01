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

  return (
    <div className="store-card">
      <div className="store-card-img-wrap">
        <img 
          src={product.image || "https://placehold.co/400x400/180228/9000FA?text=Astralix"} 
          alt={product.name} 
          className="store-card-img" 
        />
      </div>
      <div className="store-card-body">
        <h3 className="store-card-title">{product.name}</h3>
        <div className="store-card-bottom">
          <span className="store-card-price">{product.price} {product.currency || "USD"}</span>
          <div className="store-card-actions">
            <button className="store-card-info" title="Ver detalles">
              <i className="fa-solid fa-info"></i>
            </button>
            <button className="store-card-btn" onClick={handleAddToCart} title="Añadir al carrito">
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

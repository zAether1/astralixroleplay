"use client";

import { Product } from "@/lib/tip4serv/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="store-empty">
        <div className="store-empty-text">No hay productos disponibles en esta categoría.</div>
      </div>
    );
  }

  return (
    <div className="store-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

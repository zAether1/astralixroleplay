"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { SlidersHorizontal, ArrowDownAZ, ArrowUpDown, Frown } from "lucide-react";
import { Product } from "@/lib/tip4serv/types";

export default function ProductGrid({ products = [] }: { products: Product[] }) {
  const [sortBy, setSortBy] = useState<"name" | "price">("name");

  const sorted = [...products].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="flex-1 flex flex-col gap-5 min-w-0">
      {/* Header / Filter Area */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#1e0332]/40 border border-white/5 rounded-[var(--radius-lg)] p-5 backdrop-blur-sm gap-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-accent rounded-full shadow-[0_0_8px_rgba(144,0,250,0.4)]" />
          <div>
            <h1 className="font-display font-bold text-white text-xl tracking-tight">
              Paquetes Disponibles
            </h1>
            <p className="text-[0.78rem] text-text-muted mt-0.5">
              Explora todos los paquetes y beneficios exclusivos
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Sort buttons */}
          <button
            onClick={() => setSortBy("name")}
            className={`flex items-center gap-1.5 text-[0.78rem] font-bold uppercase tracking-wider px-3.5 py-2 rounded-lg border transition-all ${
              sortBy === "name"
                ? "text-accent bg-accent/10 border-accent/20"
                : "text-text-muted bg-transparent border-white/5 hover:border-white/10 hover:text-white"
            }`}
          >
            <ArrowDownAZ size={14} />
            Nombre
          </button>
          <button
            onClick={() => setSortBy("price")}
            className={`flex items-center gap-1.5 text-[0.78rem] font-bold uppercase tracking-wider px-3.5 py-2 rounded-lg border transition-all ${
              sortBy === "price"
                ? "text-accent bg-accent/10 border-accent/20"
                : "text-text-muted bg-transparent border-white/5 hover:border-white/10 hover:text-white"
            }`}
          >
            <ArrowUpDown size={14} />
            Precio
          </button>
          <div className="text-[0.78rem] font-bold text-accent/80 uppercase tracking-widest bg-accent/10 px-4 py-2 rounded-lg border border-accent/20 ml-2 hidden sm:block">
            {products.length} Productos
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-text-muted bg-[#1e0332]/20 border border-white/5 rounded-[var(--radius-lg)]">
          <Frown size={48} className="opacity-20 mb-4" />
          <p className="font-display text-lg font-bold text-white/50 mb-1">No se encontraron productos</p>
          <p className="text-sm">Intenta seleccionar otra categoría.</p>
        </div>
      ) : (
        /* Product Grid - Masonry columns */
        <div className="columns-1 sm:columns-2 xl:columns-3 gap-5 w-full">
          {sorted.map((product, i) => {
            const isDiscounted = product.discount?.applied;
            const originalPrice = isDiscounted ? product.discount?.original : null;
            
            return (
              <div key={product.id} style={{ animationDelay: `${i * 0.08}s` }}>
                <ProductCard 
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={originalPrice}
                  image={product.image}
                  currency={product.currency}
                  category={undefined} // Tip4Serv might not pass category names consistently to products, omit or map later
                  badge={product.featured ? "Destacado" : undefined}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

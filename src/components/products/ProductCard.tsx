"use client";

import { ShoppingCart, Eye } from "lucide-react";
import { useCart } from "@/lib/cart/store";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number | null;
  image?: string | null;
  currency: string;
  category?: string;
  badge?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  currency,
  category,
  badge,
}: ProductProps) {
  const { addItem } = useCart();
  const hasDiscount = originalPrice && originalPrice > price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: id,
      name,
      price,
      currency,
      image: image || null,
      quantity: 1,
    });
  };

  return (
    <div
      className="group relative w-full mb-5 break-inside-avoid cursor-pointer"
      style={{ animation: "scaleUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards" }}
    >
      <div className="relative w-full rounded-[var(--radius-lg)] overflow-hidden border border-white/10 bg-[#0000004d] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_8px_30px_rgba(0,0,0,0.3)] group-hover:-translate-y-2 group-hover:border-accent/50 group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(144,0,250,0.2)] aspect-square md:aspect-[4/5]">
        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 z-10 bg-accent text-white text-[0.7rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-[0_0_12px_rgba(144,0,250,0.5)]">
            {badge}
          </div>
        )}

        {/* Discount badge */}
        {hasDiscount && (
          <div className="absolute top-3 right-3 z-10 bg-success text-white text-[0.7rem] font-bold px-2.5 py-1 rounded-full">
            -{Math.round((((originalPrice as number) - price) / (originalPrice as number)) * 100)}%
          </div>
        )}

        {/* Product Image */}
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover block transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] bg-surface group-hover:scale-[1.06]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1e0332] to-[#0f0118] transition-transform duration-[600ms] group-hover:scale-[1.06]">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-3">
              <ShoppingCart size={28} className="text-accent/40" />
            </div>
            {category && (
              <span className="text-white/20 font-display font-bold text-sm uppercase tracking-wider">{category}</span>
            )}
          </div>
        )}

        {/* Gradient overlay - always slightly visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content overlay */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
          {/* Info */}
          <div className="flex flex-col translate-y-2 group-hover:translate-y-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
            {category && (
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-accent/70 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {category}
              </span>
            )}
            <h3 className="font-display font-bold text-[1.1rem] text-white mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] line-clamp-2">
              {name}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-[1rem] text-white font-bold">
                ${price.toFixed(2)}
              </span>
              <span className="text-[0.75rem] text-white/50 font-medium">{currency}</span>
              {hasDiscount && (
                <span className="text-[0.8rem] text-white/40 line-through">
                  ${(originalPrice as number).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2">
            <button 
              onClick={handleAddToCart}
              className="w-10 h-10 min-w-[2.5rem] rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white translate-y-3 scale-90 opacity-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-75 hover:!bg-accent hover:!scale-110 hover:!shadow-[0_0_12px_rgba(144,0,250,0.5)]"
            >
              <ShoppingCart size={17} />
            </button>
            <button className="w-10 h-10 min-w-[2.5rem] rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white translate-y-3 scale-90 opacity-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[125ms] hover:!bg-white/20 hover:!scale-110">
              <Eye size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

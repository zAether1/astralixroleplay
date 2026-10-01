"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { LayoutGrid, Star, Car, Package, Sword, Crown, Search, Folder } from "lucide-react";
import { Category } from "@/lib/tip4serv/types";

// Map some common category names to icons for better visuals
const getCategoryIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes("vip") || lower.includes("rango")) return Crown;
  if (lower.includes("veh") || lower.includes("car")) return Car;
  if (lower.includes("pack")) return Package;
  if (lower.includes("item") || lower.includes("arma")) return Sword;
  if (lower.includes("star") || lower.includes("destacad")) return Star;
  return Folder;
};

export default function CategorySidebar({ categories = [] }: { categories: Category[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCatId = searchParams.get("cat");

  return (
    <aside className="w-full lg:w-[16rem] flex-shrink-0 flex flex-col gap-3">
      <div className="bg-[#1e0332]/60 border border-border rounded-[var(--radius-lg)] py-4 sticky top-24 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-[8px]">
        {/* Search trigger */}
        <div className="mx-3 mb-3">
          <button className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-white/[0.03] border border-border rounded-[var(--radius-sm)] text-text-disabled text-[0.88rem] font-body transition-all hover:border-border-light hover:bg-white/[0.05] cursor-pointer">
            <Search size={14} />
            <span className="flex-1 text-left">Buscar...</span>
            <kbd className="font-display text-[0.65rem] font-semibold px-1.5 py-0.5 rounded-[3px] bg-white/[0.06] border border-border text-text-disabled">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Title */}
        <h2 className="font-display font-bold text-white text-[0.8rem] mb-2 px-6 uppercase tracking-[0.1em]">
          Categorías
        </h2>

        {/* Navigation */}
        <nav className="flex flex-col">
          {/* "All" category */}
          <Link
            href="/tienda"
            className={`group flex items-center gap-3 px-6 py-3 transition-all duration-200 border-l-2 ${
              pathname === "/tienda" && !currentCatId
                ? "text-white bg-white/5 border-accent"
                : "text-text-muted hover:text-white hover:bg-white/[0.03] border-transparent"
            }`}
          >
            <LayoutGrid
              size={16}
              className={
                pathname === "/tienda" && !currentCatId
                  ? "text-accent"
                  : "text-text-disabled group-hover:text-text-secondary transition-colors"
              }
            />
            <span className="font-display text-[0.85rem] font-bold tracking-[0.04em] uppercase">
              Todos
            </span>
          </Link>

          {categories.map((category) => {
            const isActive = currentCatId === category.id.toString() || currentCatId === category.slug;
            const Icon = getCategoryIcon(category.name);

            return (
              <Link
                key={category.id}
                href={`/tienda?cat=${category.slug || category.id}`}
                className={`group flex items-center gap-3 px-6 py-3 transition-all duration-200 border-l-2 ${
                  isActive
                    ? "text-white bg-white/5 border-accent"
                    : "text-text-muted hover:text-white hover:bg-white/[0.03] border-transparent"
                }`}
              >
                <Icon
                  size={16}
                  className={
                    isActive
                      ? "text-accent"
                      : "text-text-disabled group-hover:text-text-secondary transition-colors"
                  }
                />
                <span className="font-display text-[0.85rem] font-bold tracking-[0.04em] uppercase">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="mt-4 pt-3 mx-6 border-t border-border">
          <p className="text-[0.75rem] text-text-disabled">
            {categories.length} categorías disponibles
          </p>
        </div>
      </div>
    </aside>
  );
}

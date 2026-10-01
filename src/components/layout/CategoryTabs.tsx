"use client";

import Link from "next/link";
import { Category } from "@/lib/tip4serv/types";

// Mapeo genérico de iconos para las categorías
export function getCategoryIcon(slug: string): string {
  const iconMap: Record<string, string> = {
    vip: "fa-crown",
    vips: "fa-crown",
    paquetes: "fa-box-open",
    dinero: "fa-coins",
    naranjitas: "fa-coins",
    vehiculos: "fa-car",
    peds: "fa-user-ninja",
    extras: "fa-plus",
    "ropa-personalizada": "fa-shirt",
    ropa: "fa-shirt",
    organizaciones: "fa-users",
    sanciones: "fa-gavel"
  };
  return iconMap[slug.toLowerCase()] || "fa-cube";
}

export function CategoryTabs({ 
  categories, 
  currentCategorySlug 
}: { 
  categories: Category[], 
  currentCategorySlug: string 
}) {
  return (
    <div className="store-tabs-wrap">
      <div className="store-tabs">
        {categories.map((cat) => (
          <Link 
            key={cat.id} 
            href={`/tienda/categoria/${cat.slug}`}
            className={`store-tab ${currentCategorySlug === cat.slug ? "store-tab--active" : ""}`}
          >
            <i className={`fa-solid ${getCategoryIcon(cat.slug)}`}></i> {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

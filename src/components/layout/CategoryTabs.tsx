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
    astralixitos: "fa-coins",
    vehiculos: "fa-car",
    peds: "fa-user-ninja",
    extras: "fa-plus",
    "ropa-personalizada": "fa-shirt",
    ropa: "fa-shirt",
    organizaciones: "fa-users",
    sanciones: "fa-gavel"
  };
  
  // Transform slug for mapping
  const normalizedSlug = slug.toLowerCase() === "naranjitas" ? "astralixitos" : slug.toLowerCase();
  return iconMap[normalizedSlug] || "fa-cube";
}

export function getCategoryPresentationName(name: string): string {
  if (name.toLowerCase() === "naranjitas") {
    return "ASTRALIXITOS";
  }
  return name;
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
            <i className={`fa-solid ${getCategoryIcon(cat.slug)}`}></i> {getCategoryPresentationName(cat.name)}
          </Link>
        ))}
      </div>
    </div>
  );
}

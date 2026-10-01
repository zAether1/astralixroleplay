"use client";

import Link from "next/link";
import { Category } from "@/lib/tip4serv/types";

// Icon mapping extracted from the original theme DOM:
// VIP → fa-crown, Paquetes → fa-box, Naranjitas/Astralixitos → fa-coins,
// Dinero → fa-dollar-sign, Peds → fa-user, Extras → fa-plus,
// Ropa Personalizada → fa-shirt, Organizaciones → fa-users, Sanciones → fa-skull
export function getCategoryIcon(slug: string): string {
  const iconMap: Record<string, string> = {
    vip: "fa-crown",
    vips: "fa-crown",
    paquetes: "fa-box",
    astralixitos: "fa-coins",
    dinero: "fa-dollar-sign",
    vehiculos: "fa-car",
    peds: "fa-user",
    extras: "fa-plus",
    "ropa-personalizada": "fa-shirt",
    ropa: "fa-shirt",
    organizaciones: "fa-users",
    sanciones: "fa-skull",
  };

  // If Tip4Serv still returns "naranjitas", map it to astralixitos
  const normalizedSlug =
    slug.toLowerCase() === "naranjitas" ? "astralixitos" : slug.toLowerCase();
  return iconMap[normalizedSlug] || "fa-cube";
}

// Visual name transformation: Naranjitas → ASTRALIXITOS
export function getCategoryDisplayName(name: string): string {
  if (name.toLowerCase() === "naranjitas") {
    return "ASTRALIXITOS";
  }
  return name;
}

export function CategoryTabs({
  categories,
  currentCategorySlug,
}: {
  categories: Category[];
  currentCategorySlug?: string;
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
            <i className={`fa-solid ${getCategoryIcon(cat.slug)}`}></i>{" "}
            {getCategoryDisplayName(cat.name)}
          </Link>
        ))}
      </div>
    </div>
  );
}

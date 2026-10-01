/* ─────────────────────────────────────────────
 * Tip4Serv API Types
 * Based on: https://tip4serv.gitbook.io/tip4serv-api/
 * ───────────────────────────────────────────── */

// ──── Raw API responses ────

export interface Tip4ServRawProduct {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string | null;
  price: number | string;
  currency?: string;
  category_id?: number | null;
  category?: number | null;
  enabled?: boolean;
  stock?: number | null;
  custom_price?: boolean;
  featured?: boolean;
  position?: number;
  custom_fields?: Tip4ServRawCustomField[];
  discount?: Tip4ServRawDiscount | null;
}

export interface Tip4ServRawCategory {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  image?: string | null;
  position?: number;
  parent_id?: number | null;
  enabled?: boolean;
}

export interface Tip4ServRawStore {
  id?: number;
  store_id?: number;
  name?: string;
  store_name?: string;
  currency?: string;
  logo?: string | null;
}

export interface Tip4ServRawDiscount {
  id?: number;
  name?: string;
  type?: "percentage" | "fixed";
  value?: number;
  original_price?: number | null;
}

export interface Tip4ServRawCustomField {
  id: number;
  name: string;
  type?: string;
  description?: string;
  required?: boolean;
  options?: string[];
  price?: number;
}

// ──── Normalized types (used by UI) ────

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  price: number;
  currency: string;
  categoryId: number | null;
  enabled: boolean;
  stock: number | null;
  customPrice: boolean;
  featured: boolean;
  position: number;
  customFields: CustomField[];
  discount: Discount | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  position: number;
  parentId: number | null;
  enabled: boolean;
  subcategories: Category[];
}

export interface Store {
  id: number | string;
  name: string;
  currency: string;
  logo: string | null;
}

export interface Discount {
  id?: number;
  name: string;
  type: "percentage" | "fixed";
  value: number;
  applied: boolean;
  original: number | null;
}

export interface CustomField {
  id: number;
  name: string;
  type: string;
  description: string;
  required: boolean;
  options: string[];
  price: number;
}

// ──── Cart types ────

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  currency: string;
  image: string | null;
  quantity: number;
}

export interface CheckoutRequest {
  products: {
    product_id: number;
    quantity: number;
  }[];
  user?: Record<string, string>;
  currency?: string;
}

export interface CheckoutResponse {
  success: boolean;
  url?: string;
  error?: string;
}

// ──── API route response types ────

export interface ApiProductsResponse {
  success: boolean;
  products: Product[];
  error?: string;
}

export interface ApiCategoriesResponse {
  success: boolean;
  categories: Category[];
  error?: string;
}

export interface ApiCheckoutResponse {
  success: boolean;
  url?: string;
  error?: string;
}

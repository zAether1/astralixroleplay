import {
  Tip4ServRawProduct,
  Tip4ServRawCategory,
  Tip4ServRawStore,
  Tip4ServRawDiscount,
  Tip4ServRawCustomField,
  Product,
  Category,
  Store,
  Discount,
  CustomField,
  CartItem
} from "./types";

export function normalizeProduct(raw: Tip4ServRawProduct): Product | null {
  if (!raw) return null;

  return {
    id: raw.id,
    name: raw.name || "",
    slug: raw.slug || "",
    description: raw.description || "",
    image: raw.image || null,
    price: typeof raw.price === "string" ? parseFloat(raw.price) : (raw.price || 0),
    currency: raw.currency || "EUR",
    categoryId: raw.category_id ?? raw.category ?? null,
    enabled: raw.enabled !== false,
    stock: raw.stock ?? null,
    customPrice: raw.custom_price || false,
    featured: raw.featured === true,
    position: raw.position || 0,
    customFields: normalizeCustomFields(raw.custom_fields),
    discount: raw.discount ? normalizeDiscount(raw.discount) : null,
  };
}

export function normalizeCategory(raw: Tip4ServRawCategory): Category | null {
  if (!raw) return null;

  return {
    id: raw.id,
    name: raw.name || "",
    slug: raw.slug || "",
    description: raw.description || "",
    image: raw.image || null,
    position: raw.position || 0,
    parentId: raw.parent_id || null,
    enabled: raw.enabled !== false,
    subcategories: [], // Populated later when building tree
  };
}

export function normalizeStore(raw: Tip4ServRawStore): Store | null {
  if (!raw) return null;

  return {
    id: raw.id || raw.store_id || "",
    name: raw.name || raw.store_name || "",
    currency: raw.currency || "EUR",
    logo: raw.logo || null,
  };
}

export function normalizeDiscount(raw: Tip4ServRawDiscount): Discount | null {
  if (!raw) return null;

  return {
    id: raw.id,
    name: raw.name || "",
    type: raw.type || "percentage",
    value: typeof raw.value === "string" ? parseFloat(raw.value) : (raw.value || 0),
    applied: true,
    original: typeof raw.original_price === "string" ? parseFloat(raw.original_price) : (raw.original_price || null),
  };
}

export function normalizeCustomFields(raw?: Tip4ServRawCustomField[]): CustomField[] {
  if (!raw || !Array.isArray(raw)) return [];

  return raw.map((field) => ({
    id: field.id,
    name: field.name || "",
    type: field.type || "text",
    description: field.description || "",
    required: field.required || false,
    options: field.options || [],
    price: typeof field.price === "string" ? parseFloat(field.price) : (field.price || 0),
  }));
}

export function normalizeCartItem(product: Product, quantity = 1): CartItem {
  return {
    productId: product.id,
    name: product.name,
    price: product.price,
    currency: product.currency,
    image: product.image,
    quantity: quantity,
  };
}

export function buildCategoryTree(categories: Category[]): Category[] {
  const roots: Category[] = [];
  const lookup: Record<number, Category> = {};

  // Index all categories
  categories.forEach((cat) => {
    lookup[cat.id] = { ...cat, subcategories: [] };
  });

  // Build tree
  categories.forEach((cat) => {
    if (cat.parentId && lookup[cat.parentId]) {
      lookup[cat.parentId].subcategories.push(lookup[cat.id]);
    } else {
      roots.push(lookup[cat.id]);
    }
  });

  // Sort by position
  roots.sort((a, b) => a.position - b.position);
  roots.forEach((root) => {
    root.subcategories.sort((a, b) => a.position - b.position);
  });

  return roots;
}

export function formatPrice(price: number, currency = "EUR"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

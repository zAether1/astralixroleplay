/**
 * Data Normalizer
 * 
 * Transforms Tip4Serv API responses into a normalized format
 * used by the Atom UI layer. This prevents the UI from depending
 * directly on the Tip4Serv JSON structure.
 * 
 * Tip4Serv API response → normalizer → Atom UI data
 */

/**
 * Normalize a product from Tip4Serv format to Atom format
 * 
 * Tip4Serv product fields (from docs):
 * - id, name, slug, description, image, price, currency
 * - category_id, enabled, stock, custom_price, position
 * - commands, custom_fields, discount
 * 
 * @param {Object} raw - Raw product from Tip4Serv API
 * @returns {Object} Normalized product
 */
function normalizeProduct(raw) {
  if (!raw) return null;

  return {
    id: raw.id,
    name: raw.name || '',
    slug: raw.slug || '',
    description: raw.description || '',
    image: raw.image || null,
    price: parseFloat(raw.price) || 0,
    currency: raw.currency || 'EUR',
    categoryId: (raw.category_id !== undefined && raw.category_id !== null) ? raw.category_id : ((raw.category !== undefined && raw.category !== null) ? raw.category : null),
    enabled: raw.enabled !== false,
    stock: raw.stock ?? null,
    customPrice: raw.custom_price || false,
    featured: raw.featured === true,
    position: raw.position || 0,
    customFields: normalizeCustomFields(raw.custom_fields),
    discount: raw.discount ? normalizeDiscount(raw.discount) : null,
    // Original data preserved for edge cases
    _raw: raw,
  };
}

/**
 * Normalize a category from Tip4Serv format
 * 
 * Tip4Serv category fields (from docs):
 * - id, name, slug, description, image, position, parent_id, enabled
 */
function normalizeCategory(raw) {
  if (!raw) return null;

  return {
    id: raw.id,
    name: raw.name || '',
    slug: raw.slug || '',
    description: raw.description || '',
    image: raw.image || null,
    position: raw.position || 0,
    parentId: raw.parent_id || null,
    enabled: raw.enabled !== false,
    subcategories: [],
    products: [],
    _raw: raw,
  };
}

/**
 * Normalize store info
 */
function normalizeStore(raw) {
  if (!raw) return null;

  return {
    id: raw.id || raw.store_id || '',
    name: raw.name || raw.store_name || '',
    currency: raw.currency || 'EUR',
    logo: raw.logo || null,
    _raw: raw,
  };
}

/**
 * Normalize a discount
 */
function normalizeDiscount(raw) {
  if (!raw) return null;

  return {
    id: raw.id,
    name: raw.name || '',
    type: raw.type || 'percentage',
    value: parseFloat(raw.value) || 0,
    applied: true,
    original: raw.original_price || null,
  };
}

/**
 * Normalize custom fields (used for checkout)
 */
function normalizeCustomFields(raw) {
  if (!raw || !Array.isArray(raw)) return [];

  return raw.map(field => ({
    id: field.id,
    name: field.name || '',
    type: field.type || 'text',
    description: field.description || '',
    required: field.required || false,
    options: field.options || [],
    price: parseFloat(field.price) || 0,
  }));
}

/**
 * Normalize a cart item for checkout
 */
function normalizeCartItem(product, quantity = 1) {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    currency: product.currency,
    quantity: quantity,
    image: product.image,
  };
}

/**
 * Build a nested category tree from flat categories
 */
function buildCategoryTree(categories) {
  const roots = [];
  const lookup = {};

  // Index all categories
  categories.forEach(cat => {
    lookup[cat.id] = { ...cat, subcategories: [] };
  });

  // Build tree
  categories.forEach(cat => {
    if (cat.parentId && lookup[cat.parentId]) {
      lookup[cat.parentId].subcategories.push(lookup[cat.id]);
    } else {
      roots.push(lookup[cat.id]);
    }
  });

  // Sort by position
  roots.sort((a, b) => a.position - b.position);
  roots.forEach(root => {
    root.subcategories.sort((a, b) => a.position - b.position);
  });

  return roots;
}

/**
 * Format price for display
 */
function formatPrice(price, currency = 'EUR') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

module.exports = {
  normalizeProduct,
  normalizeCategory,
  normalizeStore,
  normalizeDiscount,
  normalizeCustomFields,
  normalizeCartItem,
  buildCategoryTree,
  formatPrice,
};

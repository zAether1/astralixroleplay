/**
 * Tip4Serv API Client
 * 
 * Based on official documentation:
 * https://tip4serv.gitbook.io/tip4serv-api/
 * 
 * Base URL: https://api.tip4serv.com/v1
 * Auth: Authorization: Bearer <API_KEY>
 * 
 * Verified endpoints used:
 * - GET  /store/whoami              — Store info
 * - GET  /store/products            — List products
 * - GET  /store/product/{slug}      — Product detail
 * - GET  /store/categories          — List categories
 * - GET  /store/checkout/identifiers — Checkout required fields
 * - POST /store/checkout            — Create checkout session
 * - GET  /store/discount/discounts  — Active discounts
 * - GET  /store/discount/giftcard/{code} — Gift card lookup
 * - GET  /store/customers           — Customer list (admin)
 * - GET  /store/payments            — Payment list (admin)
 */

const fetch = require('node-fetch');

class Tip4ServClient {
  constructor(apiKey, storeId) {
    this.apiKey = apiKey;
    this.storeId = storeId;
    this.baseUrl = 'https://api.tip4serv.com/v1';
    this._cache = new Map();
    this._cacheTTL = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Make authenticated request to Tip4Serv API
   */
  async _request(method, path, body = null, useAuth = true) {
    const url = `${this.baseUrl}${path}`;
    const headers = {
      'Content-Type': 'application/json',
    };

    if (useAuth && this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    const options = { method, headers };
    if (body && (method === 'POST' || method === 'PATCH')) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        if (url.includes('identifiers')) {
          console.log(`[DEBUG] identifiers error response: ${errorText}`);
        }
        const error = new Error(`Tip4Serv API error: ${response.status} ${response.statusText}`);
        error.status = response.status;
        error.body = errorText;
        throw error;
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      return await response.text();
    } catch (err) {
      if (err.status) throw err;
      const error = new Error(`Tip4Serv API connection error: ${err.message}`);
      error.status = 0;
      error.originalError = err;
      throw error;
    }
  }

  /**
   * Cached request wrapper
   */
  async _cachedRequest(cacheKey, method, path, body = null, useAuth = true) {
    const cached = this._cache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < this._cacheTTL)) {
      return cached.data;
    }

    const data = await this._request(method, path, body, useAuth);
    this._cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  }

  /**
   * Clear all cached data
   */
  clearCache() {
    this._cache.clear();
  }

  // ============================================
  // STORE
  // Documented: GET /store/whoami
  // ============================================
  async getStore() {
    return this._cachedRequest('store', 'GET', '/store/whoami');
  }

  // ============================================
  // PRODUCTS
  // Documented: GET /store/products
  // Query params: page, max_page, details, currency, category, only_enabled
  // ============================================
  async getProducts(options = {}) {
    const params = new URLSearchParams();
    if (options.page) params.set('page', options.page);
    if (options.currency) params.set('currency', options.currency);
    if (options.category) params.set('category', options.category);
    if (options.details) params.set('details', options.details);
    if (options.only_enabled !== undefined) params.set('only_enabled', options.only_enabled);

    const qs = params.toString();
    const path = `/store/products${qs ? '?' + qs : ''}`;
    const cacheKey = `products_${qs}`;

    return this._cachedRequest(cacheKey, 'GET', path);
  }

  // ============================================
  // PRODUCT DETAIL
  // Documented: GET /store/product/{slug}
  // ============================================
  async getProduct(slug) {
    const cacheKey = `product_${slug}`;
    return this._cachedRequest(cacheKey, 'GET', `/store/product/${encodeURIComponent(slug)}`);
  }

  // ============================================
  // CATEGORIES
  // Documented: GET /store/categories
  // Query params: parent (for subcategories)
  // ============================================
  async getCategories(parentId = null) {
    const params = new URLSearchParams();
    if (parentId) params.set('parent', parentId);

    const qs = params.toString();
    const path = `/store/categories${qs ? '?' + qs : ''}`;
    const cacheKey = `categories_${qs || 'root'}`;

    return this._cachedRequest(cacheKey, 'GET', path);
  }

  // ============================================
  // CHECKOUT IDENTIFIERS
  // Documented: GET /store/checkout/identifiers
  // Query params: store, products[]
  // NOTE: Requires API key auth
  // ============================================
  async getCheckoutIdentifiers(productIds) {
    const params = new URLSearchParams();
    params.set('store', this.storeId);
    if (productIds && productIds.length > 0) {
      productIds.forEach(id => params.append('products[]', id));
    }

    const qs = params.toString();
    return this._request('GET', `/store/checkout/identifiers?${qs}`, null, true);
  }

  // ============================================
  // CHECKOUT
  // Documented: POST /store/checkout?store={store_id}
  // NOTE: Requires API key auth
  // Body: { products, user, currency, redirect_success_checkout, redirect_canceled_checkout }
  // ============================================
  async createCheckout(checkoutData) {
    return this._request('POST', `/store/checkout?store=${this.storeId}`, checkoutData, true);
  }

  // ============================================
  // DISCOUNTS
  // Documented: GET /store/discount/discounts
  // ============================================
  async getDiscounts() {
    return this._cachedRequest('discounts', 'GET', '/store/discount/discounts');
  }

  // ============================================
  // GIFT CARD LOOKUP
  // Documented: GET /store/discount/giftcard/{code}
  // ============================================
  async getGiftCard(code) {
    return this._request('GET', `/store/discount/giftcard/${encodeURIComponent(code)}`);
  }

  // ============================================
  // CUSTOMERS (admin endpoint)
  // Documented: GET /store/customers
  // ============================================
  async getCustomers(options = {}) {
    const params = new URLSearchParams();
    if (options.date_filter) params.set('date_filter', JSON.stringify(options.date_filter));
    if (options.sort) params.set('sort', options.sort);

    const qs = params.toString();
    return this._request('GET', `/store/customers${qs ? '?' + qs : ''}`);
  }

  // ============================================
  // PAYMENTS (admin endpoint)
  // Documented: GET /store/payments
  // ============================================
  async getPayments(options = {}) {
    const params = new URLSearchParams();
    if (options.identifier) params.set('identifier', options.identifier);

    const qs = params.toString();
    return this._request('GET', `/store/payments${qs ? '?' + qs : ''}`);
  }
}

module.exports = Tip4ServClient;

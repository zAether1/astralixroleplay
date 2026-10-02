import { CheckoutRequest } from "./types";

/**
 * Tip4Serv API Client
 * Compatible with Vercel serverless functions/Next.js App Router
 */

const BASE_URL = "https://api.tip4serv.com/v1";

export class Tip4ServClient {
  private apiKey: string;
  private storeId: string;

  constructor() {
    this.apiKey = process.env.TIP4SERV_API_KEY || "";
    this.storeId = "23746";

    if (!this.apiKey) {
      console.warn("[Tip4Serv] WARNING: TIP4SERV_API_KEY not set.");
    }
  }

  private async request<T>(method: string, path: string, body?: any, useAuth = true): Promise<T> {
    const url = `${BASE_URL}${path}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (useAuth && this.apiKey) {
      headers["Authorization"] = `Bearer ${this.apiKey}`;
    }

    const options: RequestInit = {
      method,
      headers,
      // Use Next.js caching strategy for GET requests (revalidate every 60s)
      next: method === "GET" ? { revalidate: 60 } : undefined,
    };

    if (body && (method === "POST" || method === "PATCH")) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error");
        console.error(`[Tip4Serv API Error] ${response.status} ${response.statusText} - ${errorText}`);
        throw new Error(`Tip4Serv API error: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return (await response.json()) as T;
      }
      return (await response.text()) as any as T;
    } catch (err: any) {
      console.error(`[Tip4Serv Connection Error] ${err.message}`);
      throw err;
    }
  }

  // ============================================
  // STORE
  // ============================================
  async getStore() {
    return this.request<any>("GET", "/store/whoami");
  }

  // ============================================
  // PRODUCTS
  // ============================================
  async getProducts(options: {
    page?: number;
    currency?: string;
    category?: number | string;
    details?: boolean;
    only_enabled?: boolean;
  } = {}) {
    const params = new URLSearchParams();
    if (options.page) params.set("page", options.page.toString());
    if (options.currency) params.set("currency", options.currency);
    if (options.category) params.set("category", options.category.toString());
    if (options.details) params.set("details", options.details.toString());
    if (options.only_enabled !== undefined) params.set("only_enabled", options.only_enabled.toString());

    const qs = params.toString();
    const path = `/store/products${qs ? "?" + qs : ""}`;

    return this.request<any>("GET", path);
  }

  // ============================================
  // PRODUCT DETAIL
  // ============================================
  async getProduct(slug: string) {
    return this.request<any>("GET", `/store/product/${encodeURIComponent(slug)}`);
  }

  // ============================================
  // CATEGORIES
  // ============================================
  async getCategories(parentId?: number) {
    const params = new URLSearchParams();
    if (parentId) params.set("parent", parentId.toString());

    const qs = params.toString();
    const path = `/store/categories${qs ? "?" + qs : ""}`;

    return this.request<any>("GET", path);
  }

  // ============================================
  // CHECKOUT IDENTIFIERS
  // ============================================
  async getCheckoutIdentifiers(productIds: number[]) {
    const params = new URLSearchParams();
    params.set("store", this.storeId);
    if (productIds && productIds.length > 0) {
      productIds.forEach((id) => params.append("products[]", id.toString()));
    }

    const qs = params.toString();
    return this.request<any>("GET", `/store/checkout/identifiers?${qs}`, null, true);
  }

  // ============================================
  // CHECKOUT
  // ============================================
  async createCheckout(checkoutData: CheckoutRequest) {
    if (!this.storeId) {
      throw new Error("TIP4SERV_STORE_ID is required for checkout");
    }
    return this.request<any>("POST", `/store/checkout?store=${this.storeId}`, checkoutData, true);
  }
}

// Export a singleton instance
export const tip4serv = new Tip4ServClient();

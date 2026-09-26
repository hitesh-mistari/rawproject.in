import { Product, Category, WPPage } from "../types";

// Import local JSON data statically
import productsData from "../data/products.json";
import categoriesData from "../data/categories.json";

export interface ProductQueryParams {
  page?: number;
  per_page?: number;
  category?: number | string;
  search?: string;
  orderby?: "date" | "price" | "popularity" | "rating" | "title";
  order?: "asc" | "desc";
  min_price?: number;
  max_price?: number;
  attribute?: string;
  attribute_term?: number | string;
}

export const api = {
  /**
   * Fetch products with optional filtering and pagination
   */
  async getProducts(params: ProductQueryParams = {}): Promise<{ products: Product[]; totalPages: number; total: number }> {
    let filtered = [...productsData] as unknown as Product[];

    // Filter by Category or Subcategory
    if (params.category && params.category !== 'shop') {
      const catQuery = params.category.toString().toLowerCase();
      filtered = filtered.filter(p => 
        p.categories && p.categories.some(c => 
          c.id.toString() === catQuery || 
          c.slug.toLowerCase() === catQuery ||
          c.slug.toLowerCase().replace(/-/g, '') === catQuery.replace(/-/g, '') ||
          c.name.toLowerCase() === catQuery
        )
      );
    }

    // Filter by Search
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(p => 
        (p.name || "").toLowerCase().includes(q) || 
        (p.description || "").toLowerCase().includes(q) ||
        (p.short_description || "").toLowerCase().includes(q)
      );
    }

    // Sorting
    if (params.orderby === "price") {
      filtered.sort((a, b) => {
        const pa = parseFloat(a.prices?.price || '0') || 0;
        const pb = parseFloat(b.prices?.price || '0') || 0;
        return params.order === "asc" ? pa - pb : pb - pa;
      });
    } else if (params.orderby === "title") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Pagination
    const page = params.page || 1;
    const perPage = params.per_page || 60;
    const start = (page - 1) * perPage;
    const paginated = filtered.slice(start, start + perPage);

    return {
      products: paginated,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / perPage),
    };
  },

  /**
   * Fetch single product by slug with robust fallback matching
   */
  async getProductBySlug(slug: string): Promise<Product | null> {
    if (!slug) return null;
    const s = slug.toLowerCase().trim();

    // 1. Direct slug match
    let found = productsData.find(p => p.slug && p.slug.toLowerCase() === s);
    if (found) return found as unknown as Product;

    // 2. Direct ID match
    found = productsData.find(p => p.id && p.id.toString() === s);
    if (found) return found as unknown as Product;

    // 3. Name slugified match (e.g., 'aakar-bench' -> 'Aakar Bench')
    found = productsData.find(p => {
      const nameSlug = (p.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return nameSlug === s || nameSlug.includes(s) || s.includes(nameSlug);
    });
    if (found) return found as unknown as Product;

    // 4. Loose substring match in name or slug
    found = productsData.find(p => 
      (p.slug && p.slug.toLowerCase().includes(s)) ||
      (p.name && p.name.toLowerCase().includes(s.replace(/-/g, ' ')))
    );
    if (found) return found as unknown as Product;

    return null;
  },

  /**
   * Fetch all product categories
   */
  async getCategories(): Promise<Category[]> {
    return categoriesData as unknown as Category[];
  },

  /**
   * Fetch WordPress Page content by slug
   */
  async getPageBySlug(slug: string): Promise<WPPage | null> {
    return null;
  },
};

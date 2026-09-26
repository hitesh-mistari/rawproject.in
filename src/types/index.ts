export interface ProductImage {
  id: number;
  src: string;
  thumbnail?: string;
  name?: string;
  alt?: string;
}

export interface ProductAttributeTerm {
  id: number;
  name: string;
  slug: string;
  image?: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
  taxonomy?: string;
  has_variations?: boolean;
  terms: ProductAttributeTerm[];
}

export interface ProductPrices {
  price: string;
  regular_price?: string;
  sale_price?: string;
  currency_code?: string;
  currency_symbol?: string;
  currency_prefix?: string;
  currency_suffix?: string;
  currency_decimal_separator?: string;
  currency_thousand_separator?: string;
  price_range?: {
    min_amount: string;
    max_amount: string;
  } | null;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  permalink?: string;
  description?: string;
  short_description?: string;
  sku?: string;
  prices: ProductPrices;
  price_html?: string;
  images: ProductImage[];
  categories: {
    id: number;
    name: string;
    slug: string;
    link?: string;
  }[];
  attributes: ProductAttribute[];
  has_options: boolean;
  is_purchasable: boolean;
  is_in_stock: boolean;
  low_stock_remaining?: number | null;
  average_rating?: string;
  review_count?: number;
}

export interface ProductVariation {
  id: number;
  price: string;
  regular_price?: string;
  sale_price?: string;
  attributes: {
    name: string;
    value: string;
  }[];
  image?: ProductImage;
  is_in_stock: boolean;
  sku?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  count: number;
  image?: {
    id: number;
    src: string;
  } | null;
}

export interface CartItem {
  key: string;
  id: number;
  name: string;
  quantity: number;
  price: number;
  regularPrice?: number;
  image: string;
  attributes?: Record<string, string>;
  slug: string;
}

export interface CartTotals {
  subtotal: number;
  total: number;
  currency: string;
}

export interface WPPage {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
}

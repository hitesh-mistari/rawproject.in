import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product } from "../types";

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "key">) => void;
  addItem: (product: Product, quantity?: number, attributes?: Record<string, string>) => void;
  removeFromCart: (key: string) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  cartCount: number;
  totalItems: number;
  cartTotal: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = "raw_project_cart";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [items]);

  const addToCart = (newItem: Omit<CartItem, "key">) => {
    const attrKey = newItem.attributes
      ? Object.entries(newItem.attributes)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([k, v]) => `${k}:${v}`)
          .join("-")
      : "";
    const key = `${newItem.id}-${attrKey}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.key === key);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, { ...newItem, key }];
    });

    setIsCartOpen(true);
  };

  const addItem = (product: Product, quantity: number = 1, attributes: Record<string, string> = {}) => {
    const rawPrice = parseInt(product.prices.price || "0", 10);
    const finalPrice = rawPrice > 100000 ? rawPrice / 100 : rawPrice;
    addToCart({
      id: product.id,
      name: product.name,
      price: finalPrice,
      quantity,
      image: product.images?.[0]?.src || "",
      slug: product.slug,
      attributes,
    });
  };

  const removeFromCart = (key: string) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  };

  const updateQuantity = (key: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.key === key) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        addItem,
        removeFromCart,
        removeItem: removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        openDrawer: () => setIsCartOpen(true),
        closeDrawer: () => setIsCartOpen(false),
        cartCount: totalItems,
        totalItems,
        cartTotal: totalPrice,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;

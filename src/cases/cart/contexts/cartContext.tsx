/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import type { ProductDTO } from "@/cases/products/dtos/product.dto";
import { createContext, useEffect, useState, type ReactNode } from "react";

export interface CartItem {
    product: ProductDTO;
    quantity: number;
}

export interface Cart {
    items: CartItem[];
}

type CartContextType = {
    cart: Cart;
    addProduct: (product: ProductDTO, quantity?: number) => void;
    removeProductCart: (productId: string) => void;
}

export const CartContext = createContext<CartContextType>({
  cart: { items: [] },
  addProduct: () => {},
  removeProductCart: () => {},
});

export type CartContextProviderProps = {
    children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState<Cart>({ items: [] });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const storageCart = localStorage.getItem("cart");

    if (storageCart) {
      try {
        setCart(JSON.parse(storageCart));
      } catch {
        setCart({ items: [] });
      }
    }
  }, []);
    function addProduct(product: ProductDTO, quantity: number = 1) {
        setCart((prevCart: Cart) => {
            const existingItem = prevCart.items.find((item) => item.product.id === product.id);

            let updatedItems: CartItem[];

            if (existingItem) {
                updatedItems = prevCart.items.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                updatedItems = [...prevCart.items, { product, quantity }]
            }

            return { items: updatedItems }
        })
}
function removeProductCart(productId: string) {
    setCart((prevCart) => (
        {
            items: prevCart.items.filter((item) => item.product.id !== productId)
        }
    ))
}

return (
    <CartContext.Provider value={{ cart, addProduct, removeProductCart }}>
        {children}
    </CartContext.Provider>
)
}
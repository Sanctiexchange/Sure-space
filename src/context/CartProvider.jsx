import { useState } from "react";
import { CartContext } from "./CartContext";
import { toastWithSound } from "../utility/toastWithSound";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // =========================================
  // ADD PRODUCT TO CART
  // =========================================
  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        toastWithSound.success(
          `${product.name} quantity increased`
        );

        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Number(item.quantity || 0) + 1,
              }
            : item
        );
      }

      toastWithSound.success(
        `${product.name} added to cart`
      );

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // =========================================
  // INCREASE QUANTITY
  // =========================================
  const increaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Number(item.quantity || 0) + 1,
            }
          : item
      )
    );
  };

  // =========================================
  // DECREASE QUANTITY
  // =========================================
  const decreaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.max(
                1,
                Number(item.quantity || 1) - 1
              ),
            }
          : item
      )
    );
  };

  // =========================================
  // REMOVE PRODUCT
  // =========================================
  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    );

    toastWithSound.success("Item removed from cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
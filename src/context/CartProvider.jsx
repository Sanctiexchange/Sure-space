import { useState } from "react";
import { CartContext } from "./CartContext";
import toast from "react-hot-toast";
import { toastWithSound } from "../utility/toastWithSound";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Add a product to the cart
  const addToCart = (product) => {
  const existingItem = cartItems.find(
    (item) => item.id === product.id
  );

  setCartItems((currentItems) => {
    if (existingItem) {
      return currentItems.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    }

    return [
      ...currentItems,
      {
        ...product,
        quantity: 1,
      },
    ];
  });

  if (existingItem) {
    toastWithSound.success(`${product.name} quantity increased`);
  } else {
    toastWithSound.success(`${product.name} added to cart`);
  }
};

  // Increase product quantity
  const increaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
    toastWithSound.success("Quantity increased");
  };


  // Decrease product quantity
  const decreaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
    );
    toastWithSound.success("Quantity decreased");
  };

  // Remove a product from the cart
const removeFromCart = (productId) => {
  setCartItems((currentItems) =>
    currentItems.filter((item) => item.id !== productId)
  );
  toast.success("Item Removed");
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
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem("naijaMarketOrders");

      if (!savedOrders) {
        return [];
      }

      return JSON.parse(savedOrders);
    } catch (error) {
      console.error("Error loading orders:", error);
      return [];
    }
  });

  // Save orders to localStorage whenever orders change
  useEffect(() => {
    localStorage.setItem(
      "naijaMarketOrders",
      JSON.stringify(orders)
    );
  }, [orders]);

  // Add a new order
  const addOrder = (order) => {
    setOrders((currentOrders) => {
      return [...currentOrders, order];
    });
  };

  // Clear all orders
  const clearOrders = () => {
    setOrders([]);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        clearOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error(
      "useOrders must be used inside OrderProvider"
    );
  }

  return context;
}
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const createOrder = (orderData) => {
    const order = {
      ...orderData,
      orderNumber: `NM-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    setOrders((currentOrders) => [
      ...currentOrders,
      order,
    ]);

    return order;
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
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
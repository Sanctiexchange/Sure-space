import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"

import App from './App.jsx'
import { CartProvider } from './context/CartProvider.jsx'
import { OrderProvider } from "./context/OrderContext";
import { AuthProvider } from "./context/AuthContext.jsx";
import './index.css'


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <CartProvider>
    <OrderProvider>
    <AuthProvider>
           <App />
    </AuthProvider>
    </OrderProvider>
    </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

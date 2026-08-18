import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"

import App from './App.jsx'
import { CartProvider } from './context/CartProvider.jsx'
import { OrderProvider } from "./context/OrderContext";
import { OrderConfirmation } from './pages/OrderConfirmation.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <OrderProvider>
     <CartProvider>
      <OrderConfirmation>
      <App />
      </OrderConfirmation>
     </CartProvider>
     </OrderProvider>
    </BrowserRouter>
  </StrictMode>,
)

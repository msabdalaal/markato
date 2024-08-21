import React from 'react'
import './App.css'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import ProductDetails from './pages/ProductDetails'
import ShoppingCart from './components/shoppingCart'
import ShoppingCartProvider from './providers/ShoppingCartProvider'
import ProductListProvider from './providers/ProductListContext'
createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProductListProvider>
      <ShoppingCartProvider>
        <ShoppingCart />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/:id" element={<ProductDetails />} />
          </Routes>
        </BrowserRouter>
      </ShoppingCartProvider>
    </ProductListProvider>
  </React.StrictMode>
)

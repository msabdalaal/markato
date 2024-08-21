import React from 'react'
import './App.css'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import ProductDetails from './pages/ProductDetails'
import ShoppingCart from './components/shoppingCart'
import ShoppingCartProvider from './providers/ShoppingCartProvider'
import ProductListProvider from './providers/ProductListContext'
import AuthProvider from './providers/AuthContext'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ProtectedRoute from './pages/ProtectedRoute'
import Logout from './components/Logout'
createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductListProvider>
        <ShoppingCartProvider>
          <Logout />
          <ShoppingCart />
          <BrowserRouter>
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<App />} />
                <Route path="/:id" element={<ProductDetails />} />
              </Route>
              <Route path="/Signup" element={<Signup />} />
              <Route path="/Login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </ShoppingCartProvider>
      </ProductListProvider>
    </AuthProvider>
  </React.StrictMode>
)

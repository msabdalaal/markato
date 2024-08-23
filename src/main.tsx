import React from 'react'
import './App.css'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import ProductDetails from './pages/User/ProductDetails'
import ShoppingCart from './components/shoppingCart'
import ShoppingCartProvider from './providers/ShoppingCartProvider'
import ProductListProvider from './providers/ProductListContext'
import SalesListProvider from './providers/SalesListContext'
import UserListContext from './providers/UserListContext'
import AuthProvider from './providers/AuthContext'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ProtectedRouteUser from './pages/User/ProtectedRouteUser'
import ProtectedRouteAdmin from './pages/Admin/ProtectedRouteAdmin'
import Dashboard from './pages/Admin/Dashboard'
import ProductManegment from './pages/Admin/Products/ProductManegment'
import NavBar from './components/Navbar'
import SalesManagement from './pages/Admin/Sales/SalesManagement'
import Receipt from './pages/Admin/Sales/Receipt'
createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductListProvider>
        <UserListContext>
          <SalesListProvider>
            <ShoppingCartProvider>
              <BrowserRouter>
                {/* <Logout /> */}
                <NavBar />
                <ShoppingCart />
                <Routes>
                  <Route element={<ProtectedRouteUser />}>
                    <Route element={<ProtectedRouteAdmin />}>
                      <Route path="/DashBoard" element={<Dashboard />} />
                      <Route path="/products" element={<ProductManegment />} />
                      <Route path="/Sales" element={<SalesManagement />} />
                      <Route path="/Sales/:id" element={<Receipt />} />
                    </Route>
                    <Route path="/" element={<App />} />
                    <Route path="/:id" element={<ProductDetails />} />
                  </Route>
                  <Route path="/Signup" element={<Signup />} />
                  <Route path="/Login" element={<Login />} />
                </Routes>
              </BrowserRouter>
            </ShoppingCartProvider>
          </SalesListProvider>
        </UserListContext>
      </ProductListProvider>
    </AuthProvider>
  </React.StrictMode>
)

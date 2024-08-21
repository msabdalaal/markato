export interface ProductType {
  _id: string
  name: string
  category: string
  description: string
  price: number // Changed from string to number
  stock: number
  rating: number
  imageUrl: string
}

export interface ShoppingCartProduct {
  product: ProductType
  quantity: number
  totalPrice: number
}

export interface User {
  name: string
  email: string
  password: string
  isActive: boolean
  isAdmin: boolean
  phone: string
  address: string
}

export interface Auth {
  email: string
  password: string
}

export interface ProductType {
  _id?: string
  name: string
  category: string
  description: string
  price: number // Changed from string to number
  stock: number
  rating?: number
  imageUrl: string
}

export interface ShoppingCartProduct {
  product: ProductType
  quantity: number
  totalPrice: number
}

export interface User {
  _id?: string
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

export interface Sale {
  _id?: string
  date: string
  userID: string
  items: ShoppingCartProduct[]
  totalAmount: number
}

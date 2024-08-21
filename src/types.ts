export interface ProductType {
  _id: number
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

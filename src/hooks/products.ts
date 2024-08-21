import { useContext } from 'react'
import usePostEntity from './usePostEntity'
import { ProductListContext } from '../providers/ProductListContext'
import { ProductType } from '../types'
import useDeleteEntity from './useDeleteEntity'
import useUpdateEntity from './useUpdateEntity'

export const useAddProduct = () => {
  const { setProductsList } = useContext(ProductListContext)
  return usePostEntity<ProductType>('products', setProductsList)
}

export const useDeleteProduct = () => {
  const { setProductsList } = useContext(ProductListContext)
  return useDeleteEntity<ProductType>('products', setProductsList)
}

export const useUpdateProduct = () => {
  const { setProductsList } = useContext(ProductListContext)
  return useUpdateEntity<ProductType>('products', setProductsList)
}

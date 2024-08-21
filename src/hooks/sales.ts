import { useContext } from 'react'
import usePostEntity from './usePostEntity'
import { SalesListContext } from '../providers/SalesListContext'
import { Sale } from '../types'
import useDeleteEntity from './useDeleteEntity'
import useUpdateEntity from './useUpdateEntity'

export const useAddSale = () => {
  const { setSalesList } = useContext(SalesListContext)
  return usePostEntity<Sale>('sales', setSalesList)
}

export const useDeleteSale = () => {
  const { setSalesList } = useContext(SalesListContext)
  return useDeleteEntity<Sale>('sales', setSalesList)
}

export const useUpdateSale = () => {
  const { setSalesList } = useContext(SalesListContext)
  return useUpdateEntity<Sale>('sales', setSalesList)
}

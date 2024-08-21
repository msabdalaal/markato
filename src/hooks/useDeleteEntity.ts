import { useState } from 'react'
import axios from 'axios'
import { url } from '../variables'

// Generic Type for Context
type ContextSetter<T> = (data: T[]) => void

const useDeleteEntity = <T>(
  endpoint: string,
  setContextList: ContextSetter<T> | undefined
) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const deleteEntity = async (entityId: string) => {
    try {
      setLoading(true)
      const res = await axios.delete(`${url}/${endpoint}/${entityId}`, {
        withCredentials: true
      })
      setContextList?.(res.data.newList)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return { deleteEntity, loading, error }
}

export default useDeleteEntity

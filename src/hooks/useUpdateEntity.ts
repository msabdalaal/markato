import { useState } from 'react'
import axios from 'axios'
import { url } from '../variables'

// Generic Type for Context
type ContextSetter<T> = (data: T[]) => void

const useUpdateEntity = <T>(
  endpoint: string,
  setContextList: ContextSetter<T> | undefined
) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const updateEntity = async (entityId: string, updatedData: T) => {
    try {
      setLoading(true)
      const res = await axios.put(
        `${url}/${endpoint}/${entityId}`,
        updatedData,
        {
          withCredentials: true
        }
      )
      setContextList?.(res.data.newList)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return { updateEntity, loading, error }
}

export default useUpdateEntity

import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { url } from '../variables'

// Generic Type for Context
type ContextSetter<T> = (data: T[]) => void

// Generic Hook
const usePostEntity = <T>(
  endpoint: string,
  setContextList: ContextSetter<T> | undefined
) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AxiosError>()
  const [response, setResponse] = useState<T | null>(null)

  const addEntity = async (entityData: T) => {
    try {
      setLoading(true)
      const res = await axios.post(`${url}/${endpoint}`, entityData, {
        withCredentials: true
      })
      setResponse(res.data.newEntity)
      setContextList?.(res.data.newList)
      return 'success'
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message)
        return error.response?.data.message
      }
    } finally {
      setLoading(false)
    }
  }

  return { addEntity, response, loading, error }
}

export default usePostEntity

import { useContext, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { url } from '../variables'
import { AuthContext } from '../providers/AuthContext'
import { Auth } from '../types'

const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [response, setResponse] = useState<boolean>()
  const { setAuth, setLoggedUser } = useContext(AuthContext)

  const authenticate = async (authData: Auth) => {
    try {
      setLoading(true)
      const res = await axios.post(`${url}/login`, authData, {
        withCredentials: true
      })
      setResponse(res.data.status)
      setLoggedUser?.(res.data.User)
      console.log(res.data.Employee)
      setAuth?.(res.data.status)
    } catch (error) {
      if (error instanceof AxiosError) {
        // setError(error);
        if (error.response) {
          console.log(error.response.data.msg)
          setError(error.response.data.msg)
        }
      }
    } finally {
      setLoading(false)
    }
  }
  const logout = async () => {
    try {
      setLoading(true)
      const res = await axios.delete(`${url}/login`, {
        withCredentials: true
      })
      setResponse(res.data.status)
      setAuth?.(res.data.status)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return { authenticate, logout, response, loading, error }
}

export default useAuth

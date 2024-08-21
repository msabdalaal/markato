import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { Sale } from '../types'
import { url } from '../variables'
import axios from 'axios'
import { AuthContext } from './AuthContext'

interface SalesListContextContextInterface {
  salesList: Sale[]
  setSalesList: (supplier: Sale[]) => void
  loading: boolean
  error: string
}
export const SalesListContext = createContext<
  Partial<SalesListContextContextInterface>
>({})

export default function SupplierListProvider({ children }: PropsWithChildren) {
  const [salesList, setSalesList] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()
  const { auth } = useContext(AuthContext)

  const getSales = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${url}/sales`, {
        withCredentials: true
      })
      setSalesList(response.data.newList)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (auth) getSales()
  }, [auth])

  return (
    <SalesListContext.Provider
      value={{ salesList, setSalesList, loading, error }}
    >
      {children}
    </SalesListContext.Provider>
  )
}

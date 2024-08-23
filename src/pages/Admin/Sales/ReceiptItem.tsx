import { Sale, User } from '../../../types'
import { Link } from 'react-router-dom'

type Props = {
  receipt: Sale
  user: User
  index: number
}

export default function ReceiptItem({ receipt, user, index }: Props) {
  return (
    <tr key={receipt._id}>
      <td className={styles.td}>{index + 1}</td>
      <th scope="row" className={styles.tbody_th}>
        {
          user?.name
        }
      </th>
      <td className={styles.td}>{receipt.items.length}</td>
      <td className={styles.td}>
        {`${receipt.totalAmount.toLocaleString()} EGP`}
      </td>
      <td className={styles.td}>{receipt.date}</td>
      <td>
        <Link to={`/Sales/${receipt._id}`} className="button">
          View
        </Link>
      </td>
    </tr>
  )
}
const styles = {
  td: "text-center px-6 py-4  ",
  tbody_th:
    " px-6 py-4 font-medium text-gray-900 whitespace-nowrap",
}

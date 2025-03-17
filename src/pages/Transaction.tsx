import { Link } from 'react-router'
import { useWalletContext } from '../hooks'
import { formatDate } from '../services'

export function Transaction() {
  const { state: wallets } = useWalletContext()
  return (
    <div>
      <h2>Transferencias</h2>
      <ul>
        {wallets.map(({ transactions }) =>
          transactions.map(({ id, description, total, createdAt }) => (
            <li key={id}>
              {description}-{total}-{formatDate(createdAt)}
            </li>
          ))
        )}
      </ul>
      <Link to={'/control-de-gastos/'}>Volver</Link>
    </div>
  )
}

import { Link } from 'react-router'
import { useSeo, useWalletContext } from '../hooks'
import { formatDate } from '../services'

export function Transaction() {
  const { state: wallets } = useWalletContext()
  useSeo({ title: 'Transacciones', description: 'Pagina de transacciones de una Billetera' })

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

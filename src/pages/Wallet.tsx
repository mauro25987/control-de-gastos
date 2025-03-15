import { Link, useParams } from 'react-router'
import { useWallet } from '../hooks'
import { Id } from '../types'

export function Wallet() {
  const { getWallet } = useWallet()
  const { id } = useParams<{ id: Id }>()
  if (!id) return
  const wallet = getWallet(id)

  return (
    <div>
      <div>
        <div>{wallet.name}</div>
        <ul>
          <li>{wallet.amount}</li>
          <li>
            {wallet.transactions.length > 0
              ? wallet.transactions.map(transaction => (
                  <span key={transaction.id}>
                    {transaction.description}: {transaction.total}
                  </span>
                ))
              : 'no hay transacciones'}
          </li>
        </ul>
      </div>
      <div>
        <form onSubmit={() => {}} className="flex flex-col">
          <div>
            <label>Nombre</label>
            <input type="text" name="name" required />
          </div>
          <div>
            <label>Monto</label>
            <input type="number" name="price" required />
          </div>
          <div className="flex justify-evenly">
            <button>Agregar</button>
            <Link to={'/control-de-gastos/'}>Volver</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

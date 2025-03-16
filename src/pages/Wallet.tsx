import { Link, useParams } from 'react-router'
import { useWallet } from '../hooks'
import { Id } from '../types'

export function Wallet() {
  const { getWallet, addTransaction } = useWallet()
  const { id } = useParams<{ id: Id }>()
  if (!id) return
  const wallet = getWallet(id)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { elements } = e.currentTarget
    const type = elements.namedItem('type')
    const total = elements.namedItem('total')
    const desc = elements.namedItem('description')
    const isInput =
      type instanceof HTMLInputElement &&
      total instanceof HTMLInputElement &&
      desc instanceof HTMLInputElement
    if (!isInput || type === null || total === null || desc === null) return
    addTransaction({
      id,
      transaction: {
        id: crypto.randomUUID(),
        type: type.value,
        description: desc.value,
        total: parseInt(total.value),
      },
    })
    type.value = ''
    total.value = ''
    desc.value = ''
  }

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
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div>
            <label htmlFor="">
              <input type="checkbox" name="test" />
              Gasto
            </label>
            <label htmlFor="">
              <input type="checkbox" name="test2" />
              Ingreso
            </label>
          </div>
          <div>
            <label>Desc</label>
            <input type="text" name="description" required />
          </div>
          <div>
            <label>Monto</label>
            <input type="number" name="total" required />
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

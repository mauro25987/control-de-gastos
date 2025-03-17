import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { useSeo, useWallet, useWalletContext } from '../hooks'
import { formatDate } from '../services'
import { Id } from '../types'

export function Wallet() {
  const { dispatch } = useWalletContext()
  useSeo({ title: 'Billetera', description: 'Pagina de una billetera' })

  const [editinTransactionId, setEditinTransactionId] = useState<Id | null>(null)
  const [newName, setNewName] = useState('')

  const { getWallet } = useWallet()
  const { id: idWallet } = useParams<{ id: Id }>()
  if (!idWallet) return
  const wallet = getWallet(idWallet)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { elements } = e.currentTarget
    const type = elements.namedItem('type')
    const total = elements.namedItem('total')
    const desc = elements.namedItem('description')
    const isInput =
      type instanceof RadioNodeList &&
      total instanceof HTMLInputElement &&
      desc instanceof HTMLInputElement
    if (!isInput || type === null || total === null || desc === null) return
    const selectedType = type.value as 'outcome' | 'income'
    dispatch({
      type: 'add_transaction',
      payload: {
        id: idWallet,
        transaction: {
          id: crypto.randomUUID(),
          type: selectedType,
          description: desc.value,
          total: parseInt(total.value),
          createdAt: Date.now(),
        },
      },
    })
    type.value = 'outcome'
    total.value = ''
    desc.value = ''
  }

  const handleEditTransactionName = (idWallet: Id, id: Id, desc: string) => () => {
    if (newName.trim() === '') {
      setNewName(desc)
    } else {
      dispatch({ type: 'edit_transaction_name', payload: { idWallet, id, newName } })
    }
    setEditinTransactionId(null)
    setNewName('')
  }

  return (
    <div>
      <div className="">
        <div>{wallet.name}</div>
        <div>
          <ul>
            <li>{wallet.amount}</li>
            <li>
              {wallet.transactions.length > 0
                ? wallet.transactions.map(({ id, description, total, type, createdAt }) => (
                    <div key={id}>
                      {editinTransactionId === id ? (
                        <input
                          type="text"
                          name="description"
                          value={newName}
                          onChange={e => setNewName(e.target.value)}
                          onBlur={handleEditTransactionName(idWallet, id, description)}
                          autoFocus
                        />
                      ) : (
                        description
                      )}
                      {total} {type}: Date:
                      {formatDate(createdAt)}
                      <button onClick={() => setEditinTransactionId(() => id)}>Editar</button>
                    </div>
                  ))
                : 'no hay transacciones'}
            </li>
          </ul>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-around">
            <div>
              <input type="radio" name="type" id="outcome" value="outcome" defaultChecked />
              <label htmlFor="outcome">Gasto</label>
            </div>
            <div>
              <input type="radio" name="type" id="income" value="income" />
              <label htmlFor="income">Ingreso</label>
            </div>
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

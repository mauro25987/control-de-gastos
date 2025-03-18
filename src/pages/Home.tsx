import { useState } from 'react'
import { Link } from 'react-router'
import { useSeo, useWalletContext } from '../hooks'
import { Id } from '../types'

export function Home() {
  const { state: wallets, dispatch } = useWalletContext()
  useSeo({ title: 'Home - Billeteras', description: 'Pagina lista de Billeteras' })

  const [newName, setNewName] = useState('')
  const [editingWalletId, setEditingWalletId] = useState<Id | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { elements } = e.currentTarget
    const name = elements.namedItem('name')
    const amount = elements.namedItem('amount')
    const isInput = name instanceof HTMLInputElement && amount instanceof HTMLInputElement
    if (!isInput || amount === null || name === null) return
    dispatch({
      type: 'add_wallet',
      payload: {
        id: crypto.randomUUID(),
        name: name.value,
        amount: parseInt(amount.value),
        transactions: [],
      },
    })
    name.value = ''
    amount.value = ''
  }

  const handleRemoveWallet = (id: Id) => () => {
    dispatch({ type: 'del_wallet', payload: id })
  }

  const handleEditNameWallet = (id: Id, name: string) => () => {
    if (newName.trim() === '') {
      setNewName(name)
    } else {
      dispatch({ type: 'edit_wallet_name', payload: { id, newName } })
    }
    setEditingWalletId(null)
    setNewName('')
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col space-y-6 p-4">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Billeteras</h2>
        <ul className="space-y-3">
          {wallets.length > 0 ? (
            wallets.map(({ id, name, amount }) => (
              <li key={id} className="flex items-center justify-between rounded-lg bg-gray-100 p-3">
                <div className="flex-1">
                  {editingWalletId === id ? (
                    <input
                      type="text"
                      name="name"
                      value={newName}
                      onChange={e => setNewName(e.target.value)}
                      onBlur={handleEditNameWallet(id, name)}
                      autoFocus
                    />
                  ) : (
                    <Link
                      to={`/control-de-gastos/wallet/${id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {name}
                    </Link>
                  )}
                </div>
                <div className="flex gap-2">
                  <div>{amount}</div>
                  <div onClick={handleRemoveWallet(id)}>Eliminar</div>
                  <div onClick={() => setEditingWalletId(id)}>Editar</div>
                </div>
              </li>
            ))
          ) : (
            <span className="text-xl">No hay</span>
          )}
        </ul>
      </div>
      <div>
        <h2>Agregar Billetera</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div>
            <label>Nombre</label>
            <input type="text" name="name" required />
          </div>
          <div>
            <label>Monto</label>
            <input type="number" name="amount" required />
          </div>
          <div className="text-center">
            <button>Agregar</button>
            <Link to={'/control-de-gastos/transaction'}>Transferencias</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

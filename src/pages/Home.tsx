import { DollarSign, FilePenLine, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Button } from '../components'
import { useSeo, useWalletContext } from '../hooks'
import { Id } from '../types'

export function Home() {
  const navigate = useNavigate()
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
    <section className="mx-auto mt-10 flex w-full flex-col gap-4 rounded bg-gray-300 p-4 md:w-3/4">
      <div className="mt-3">
        <h2 className="mb-3 text-center text-3xl font-bold text-black">Billeteras</h2>
        <ul className="flex flex-col gap-0.5">
          {wallets.length > 0 ? (
            wallets.map(({ id, name, amount }) => (
              <li
                key={id}
                className="mx-5 flex items-center justify-between rounded bg-gray-100 p-2"
              >
                {editingWalletId === id ? (
                  <input
                    type="text"
                    name="name"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    onBlur={handleEditNameWallet(id, name)}
                    className="mx-1 w-full bg-transparent text-black outline-2"
                    autoFocus
                  />
                ) : (
                  <Link to={`/control-de-gastos/wallet/${id}`}>
                    <div className="mx-5 cursor-pointer font-semibold text-blue-500">{name}</div>
                  </Link>
                )}

                <div className="mx-5 flex gap-2 text-slate-600">
                  <div>{amount}</div>
                  <Trash2 onClick={() => dispatch({ type: 'del_wallet', payload: id })} />
                  <Pencil onClick={() => setEditingWalletId(id)} />
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-2xl font-bold text-red-600">No hay </p>
          )}
        </ul>
      </div>
      <hr />
      <div className="mt-3 mb-7">
        <h2 className="mb-3 text-center text-2xl text-black">Agregar Billetera</h2>
        <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
          <div className="mx-5 flex items-center justify-between rounded bg-gray-100 p-2 text-slate-800">
            <FilePenLine className="md:mx-5" />
            <input
              type="text"
              name="name"
              className="mx-1 flex-1 bg-transparent outline-none md:mx-5"
              placeholder="Ingrese un nombre de billetera"
              required
            />
          </div>
          <div className="mx-5 flex items-center justify-between rounded bg-gray-100 p-2 text-slate-800">
            <DollarSign className="md:mx-5" />
            <input
              type="number"
              name="amount"
              className="mx-1 flex-1 bg-transparent outline-none md:mx-5"
              placeholder="Ingrese un monto"
              required
            />
          </div>
          <div className="mx-5 mt-5 flex justify-between">
            <Button variant="primary">Agregar</Button>
            <Button variant="secondary" onClick={() => navigate('/control-de-gastos/transaction')}>
              Transferencias
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { useSeo, useWallet, useWalletContext } from '../hooks'
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
    <section className="mx-auto mt-10 flex w-full flex-col gap-4 rounded bg-gray-300 p-4 md:w-3/4">
      <div className="mt-3">
        <h2 className="mb-3 text-center text-3xl font-bold text-black">{wallet.name}</h2>
        <ul className="flex flex-col gap-0.5">
          {wallet.transactions.length > 0 ? (
            <>
              {wallet.transactions.map(({ id, description, total, type }) => (
                <li
                  key={id}
                  className="mx-5 flex items-center justify-between rounded bg-gray-100 p-2"
                >
                  {editinTransactionId === id ? (
                    <input
                      type="text"
                      name="description"
                      value={newName}
                      onChange={e => setNewName(e.target.value)}
                      onBlur={handleEditTransactionName(idWallet, id, description)}
                      className="mx-1 w-full bg-transparent text-black outline-2"
                      autoFocus
                    />
                  ) : (
                    <div className="mx-5 font-semibold text-black">{description}</div>
                  )}

                  <div className="mx-5 flex gap-2 text-slate-600">
                    <div className={`${type === 'income' ? 'text-red-800' : 'text-blue-700'}`}>
                      $ {total}
                    </div>
                    <Pencil onClick={() => setEditinTransactionId(() => id)} />
                  </div>
                </li>
              ))}
              <li className="mx-5 flex items-center justify-between rounded bg-gray-100 p-2">
                <div className="mx-5 font-semibold text-blue-800">Total:</div>
                <div className="mx-5 font-semibold text-slate-600">$ {wallet.amount}</div>
              </li>
            </>
          ) : (
            <p className="text-center text-2xl font-bold text-red-600">No hay Transferencias</p>
          )}
        </ul>
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
    </section>
  )
}

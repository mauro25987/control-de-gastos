import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { useWalletContext } from '../hooks'
import { Id, Transaction } from '../types'

export function WalletTranfCard({
  transaction,
  idWallet,
}: {
  transaction: Transaction
  idWallet: Id
}) {
  const { id, description, total, type } = transaction
  const { dispatch } = useWalletContext()

  const [editinTransactionId, setEditinTransactionId] = useState<Id | null>(null)
  const [newName, setNewName] = useState('')

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
    <li key={id} className="mx-5 flex items-center justify-between rounded bg-gray-100 p-2">
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
        <div className={`${type === 'outcome' ? 'text-red-800' : 'text-blue-700'}`}>$ {total}</div>
        <Pencil onClick={() => setEditinTransactionId(() => id)} />
      </div>
    </li>
  )
}

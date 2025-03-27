import { Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { useWalletContext } from '../hooks'
import { Id, Wallet } from '../types'

export function WalletCard({ wallet }: { wallet: Wallet }) {
  const [newName, setNewName] = useState('')
  const [editingWalletId, setEditingWalletId] = useState<Id | null>(null)

  const { dispatch } = useWalletContext()
  const { id, name, amount } = wallet

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
    <li key={id} className="mx-5 flex items-center justify-between rounded bg-gray-100 p-2">
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
  )
}

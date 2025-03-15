import { useState } from 'react'
import { Id, Wallet, Wallets } from '../types'

const initialState: Wallets = [
  { name: 'Brou', id: 'asd-asd-asd-asd-asd', amount: 2000, transactions: [] },
  { name: 'Itau', id: 'asd-asd-asd-asd-sdd', amount: 4000, transactions: [] },
]

export const useWallet = () => {
  const [wallets, setWallets] = useState<Wallets>(initialState)

  function addWallet({ id, name, amount, transactions }: Wallet) {
    setWallets([
      ...wallets,
      {
        id,
        name,
        amount,
        transactions,
      },
    ])
  }

  function delWallet(id: Id) {
    const newWalletsList = wallets.filter(wallet => wallet.id !== id)
    setWallets(newWalletsList)
  }
  return { wallets, delWallet, addWallet }
}

import { useState } from 'react'
import { Id, Transaction, Wallet, Wallets } from '../types'

const initialState: Wallets = [
  {
    name: 'Brou',
    id: 'asd-asd-asd-asd-asd',
    amount: 2000,
    transactions: [
      {
        id: 'asd-asd-asd-asd-123',
        description: 'super',
        total: 400,
        type: 'income',
      },
      {
        id: 'asd-asd-asd-asd-133',
        description: 'nafta',
        total: 4300,
        type: 'outcome',
      },
    ],
  },
  { name: 'Itau', id: 'asd-asd-asd-asd-sdd', amount: 4000, transactions: [] },
]

export const useWallet = () => {
  const [wallets, setWallets] = useState<Wallets>(initialState)

  function addWallet({ id, name, amount, transactions }: Wallet) {
    setWallets([...wallets, { id, name, amount, transactions }])
  }

  function delWallet(id: Id) {
    const newWalletsList = wallets.filter(wallet => wallet.id !== id)
    setWallets(newWalletsList)
  }

  function getWallet(id: Id): Wallet {
    const wallet = wallets.find(wallet => wallet.id === id)
    if (!wallet) {
      throw new Error('Wallet not found')
    }
    return wallet
  }

  function addTransaction({ id, transaction }: { id: Id; transaction: Transaction }) {
    const newWalletsList = wallets.map(wallet =>
      wallet.id === id ? { ...wallet, transactions: [...wallet.transactions, transaction] } : wallet
    )
    setWallets(newWalletsList)
  }

  return { wallets, delWallet, addWallet, getWallet, addTransaction }
}

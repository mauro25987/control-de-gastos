import { useState } from 'react'
import { WalletsContext } from '../context'
import { Wallets } from '../types'

const initialState: Wallets = [
  {
    name: 'Brou',
    id: 'asd-asd-asd-asd-asd',
    amount: 40000,
    transactions: [
      {
        id: 'asd-asd-asd-asd-123',
        description: 'super',
        total: 5000,
        type: 'outcome',
        createdAt: 1742129465138,
      },
      {
        id: 'asd-asd-asd-asd-133',
        description: 'nafta',
        total: 1000,
        type: 'income',
        createdAt: 1742129465139,
      },
    ],
  },
  { name: 'Itau', id: 'asd-asd-asd-asd-sdd', amount: 4000, transactions: [] },
]

export const WalletsProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const [wallets, setWallets] = useState<Wallets>(initialState)
  return (
    <WalletsContext.Provider value={{ wallets, setWallets }}>{children}</WalletsContext.Provider>
  )
}

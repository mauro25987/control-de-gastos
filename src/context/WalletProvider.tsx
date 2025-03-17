import { useReducer } from 'react'
import { walletReduder } from '../reducers'
import { Wallets } from '../types'
import { WalletContext } from './WalletContext'

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

export const WalletProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const [state, dispatch] = useReducer(walletReduder, initialState)
  return <WalletContext.Provider value={{ state, dispatch }}>{children}</WalletContext.Provider>
}

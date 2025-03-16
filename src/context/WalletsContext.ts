import { createContext } from 'react'
import { Wallets } from '../types'

type WalletsContentType = {
  wallets: Wallets
  setWallets: React.Dispatch<React.SetStateAction<Wallets>>
}

export const WalletsContext = createContext<WalletsContentType | undefined>(undefined)

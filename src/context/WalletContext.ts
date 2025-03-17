import { createContext, Dispatch } from 'react'
import { WalletAction, WalletState } from '../reducers'

type WalletContextType = {
  state: WalletState
  dispatch: Dispatch<WalletAction>
}

export const WalletContext = createContext<WalletContextType | undefined>(undefined)

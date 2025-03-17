import { useContext } from 'react'
import { WalletContext } from '../context'

export function useWalletContext() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('Error de contexto')
  }
  return context
}

import { useContext } from 'react'
import { WalletContext } from '../context'
import { Id, Wallet } from '../types'

export const useWallet = () => {
  const walletContext = useContext(WalletContext)
  if (!walletContext) {
    throw new Error('Error de contexto')
  }
  const { state: wallets } = walletContext

  function getWallet(id: Id): Wallet {
    const wallet = wallets.find(wallet => wallet.id === id)
    if (!wallet) {
      throw new Error('Wallet not found')
    }
    return wallet
  }

  return { getWallet }
}

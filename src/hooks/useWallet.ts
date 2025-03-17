import { Id, Wallet } from '../types'
import { useWalletContext } from './useWalletContext'

export const useWallet = () => {
  const { state: wallets } = useWalletContext()

  function getWallet(id: Id): Wallet {
    const wallet = wallets.find(wallet => wallet.id === id)
    if (!wallet) {
      throw new Error('Wallet not found')
    }
    return wallet
  }

  return { getWallet }
}

import { useContext } from 'react'
import { WalletsContext } from '../context'
import { Id, Transaction, Wallet } from '../types'

export const useWallet = () => {
  const context = useContext(WalletsContext)
  if (!context) {
    throw new Error('Error de contexto')
  }
  const { setWallets, wallets } = context

  function addWallet({ id, name, amount, transactions }: Wallet) {
    setWallets(prevSate => [...prevSate, { id, name, amount, transactions }])
  }

  function delWallet(id: Id) {
    setWallets(prevState => prevState.filter(wallet => wallet.id !== id))
  }

  function getWallet(id: Id): Wallet {
    const wallet = wallets.find(wallet => wallet.id === id)
    if (!wallet) {
      throw new Error('Wallet not found')
    }
    return wallet
  }

  function addTransaction({ id, transaction }: { id: Id; transaction: Transaction }) {
    const wallet = wallets.find(wallet => wallet.id === id)
    if (!wallet) {
      throw new Error('Wallet not found')
    }
    wallet.transactions.push(transaction)

    if (transaction.type === 'income') {
      wallet.amount += transaction.total
    } else {
      wallet.amount -= transaction.total
    }

    const newWalletsList = wallets.map(wallet => (wallet.id === id ? { ...wallet } : wallet))
    setWallets(newWalletsList)
  }

  return { delWallet, addWallet, getWallet, addTransaction }
}

import { Id, Transaction, Wallet, Wallets } from '../types'

export type WalletState = Wallets

export type WalletAction =
  | { type: 'add_wallet'; payload: Wallet }
  | { type: 'del_wallet'; payload: Id }
  | { type: 'add_transaction'; payload: { id: Id; transaction: Transaction } }

export function walletReduder(state: WalletState, action: WalletAction): WalletState {
  switch (action.type) {
    case 'add_wallet': {
      return [...state, action.payload]
    }
    case 'del_wallet': {
      return state.filter(wallet => wallet.id !== action.payload)
    }
    case 'add_transaction': {
      const { id, transaction } = action.payload
      return state.map(wallet => {
        if (wallet.id === id) {
          const updatedTransactions = [...wallet.transactions, transaction]
          const updateAmunt =
            transaction.type === 'income'
              ? wallet.amount + transaction.total
              : wallet.amount - transaction.total
          return { ...wallet, amount: updateAmunt, transactions: updatedTransactions }
        }
        return wallet
      })
    }
    default:
      return state
  }
}

import { Id, Transaction, Wallet, Wallets } from '../types'

export type WalletState = Wallets

export type WalletAction =
  | { type: 'add_wallet'; payload: Wallet }
  | { type: 'del_wallet'; payload: Id }
  | { type: 'edit_wallet_name'; payload: { id: Id; newName: string } }
  | { type: 'add_transaction'; payload: { id: Id; transaction: Transaction } }
  | { type: 'edit_transaction_name'; payload: { idWallet: Id; id: Id; newName: string } }

export function walletReduder(state: WalletState, action: WalletAction): WalletState {
  switch (action.type) {
    case 'add_wallet': {
      return [...state, action.payload]
    }

    case 'del_wallet': {
      return state.filter(wallet => wallet.id !== action.payload)
    }

    case 'edit_wallet_name': {
      const { id, newName } = action.payload
      return state.map(wallet => (wallet.id === id ? { ...wallet, name: newName } : wallet))
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

    case 'edit_transaction_name': {
      const { id, newName, idWallet } = action.payload
      return state.map(wallet =>
        wallet.id === idWallet
          ? {
              ...wallet,
              transactions: wallet.transactions.map(transaction =>
                transaction.id === id ? { ...transaction, description: newName } : transaction
              ),
            }
          : wallet
      )
    }

    default:
      return state
  }
}

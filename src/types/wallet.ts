export type Id = `${string}-${string}-${string}-${string}-${string}`

export type Transaction = {
  id: Id
  type: 'income' | 'outcome'
  description: string
  total: number
}

export type Transactions = Transaction[]

export type Wallet = {
  id: Id
  name: string
  amount: number
  transactions: Transaction[]
}

export type Wallets = Wallet[]

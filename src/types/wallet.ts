export type Id = `${string}-${string}-${string}-${string}-${string}`

export type Wallet = {
  id: Id
  name: string
  amount: number
  transactions: Transactions[]
}

export type Transactions = {
  id: Id
  type: 'income' | 'outcome'
  description: string
  total: number
}

export type Wallets = Wallet[]

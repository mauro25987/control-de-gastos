import { useState } from 'react'
import { Link } from 'react-router'
import { Wallets } from '../types'

const initialState: Wallets = [
  { name: 'Brou', id: 'asd-asd-asd-asd-asd', amount: 2000, transactions: [] },
  { name: 'Itau', id: 'asd-asd-asd-asd-sdd', amount: 4000, transactions: [] },
]

export function Home() {
  const [wallets, setWallets] = useState<Wallets>(initialState)

  return (
    <div>
      <h2>Billeteras</h2>
      <ul>
        {wallets.length > 0 ? (
          wallets.map(({ id, name, amount }) => (
            <li key={id} className="flex justify-between gap-4">
              <div>
                <Link to={`/wallet/${id}`}>{name}</Link>
              </div>
              <div>{amount}</div>
            </li>
          ))
        ) : (
          <span className="text-xl">No hay</span>
        )}
      </ul>
    </div>
  )
}

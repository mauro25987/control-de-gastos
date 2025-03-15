import { Link } from 'react-router'
import { useWallet } from '../hooks'
import { Id } from '../types'

export function Home() {
  const { wallets, addWallet, delWallet } = useWallet()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { elements } = e.currentTarget
    const name = elements.namedItem('name')
    const price = elements.namedItem('price')
    const isInputName = name instanceof HTMLInputElement
    const isInputPrice = price instanceof HTMLInputElement
    if (!isInputName || !isInputPrice || price === null || name === null) return
    addWallet({
      id: crypto.randomUUID(),
      name: name.value,
      amount: parseInt(price.value),
      transactions: [],
    })
    name.value = ''
    price.value = ''
  }

  const handleRemoveWallet = (id: Id) => () => {
    delWallet(id)
  }

  return (
    <div className="flex flex-col">
      <div>
        <h2>Billeteras</h2>
        <ul>
          {wallets.length > 0 ? (
            wallets.map(({ id, name, amount }) => (
              <li key={id} className="flex justify-between gap-4">
                <div>
                  <Link to={`/control-de-gastos/wallet/${id}`}>{name}</Link>
                </div>
                <div className="flex gap-2">
                  <div>{amount}</div>
                  <div onClick={handleRemoveWallet(id)}>Eliminar</div>
                </div>
              </li>
            ))
          ) : (
            <span className="text-xl">No hay</span>
          )}
        </ul>
      </div>
      <div>
        <h2>Agregar Billetera</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div>
            <label>Nombre</label>
            <input type="text" name="name" required />
          </div>
          <div>
            <label>Monto</label>
            <input type="number" name="price" required />
          </div>
          <div className="text-center">
            <button>Agregar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

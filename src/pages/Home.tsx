import { DollarSign, FilePenLine } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Button, WalletCard } from '../components'
import { useSeo, useWalletContext } from '../hooks'

export function Home() {
  const navigate = useNavigate()
  const { state: wallets, dispatch } = useWalletContext()
  useSeo({ title: 'Home - Billeteras', description: 'Pagina lista de Billeteras' })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { elements } = e.currentTarget
    const name = elements.namedItem('name')
    const amount = elements.namedItem('amount')
    const isInput = name instanceof HTMLInputElement && amount instanceof HTMLInputElement
    if (!isInput || amount === null || name === null) return
    dispatch({
      type: 'add_wallet',
      payload: {
        id: crypto.randomUUID(),
        name: name.value,
        amount: parseInt(amount.value),
        transactions: [],
      },
    })
    name.value = ''
    amount.value = ''
  }

  return (
    <section className="mx-auto mt-10 flex w-full flex-col gap-4 rounded bg-gray-300 p-4 md:w-3/4">
      <div className="mt-3">
        <h2 className="mb-3 text-center text-3xl font-bold text-black">Billeteras</h2>
        <ul className="flex flex-col gap-0.5">
          {wallets.length > 0 ? (
            wallets.map(wallet => <WalletCard key={wallet.id} wallet={wallet} />)
          ) : (
            <p className="text-center text-2xl font-bold text-red-600">No hay Billeteras</p>
          )}
        </ul>
      </div>
      <hr />
      <div className="mt-3 mb-7">
        <h2 className="mb-3 text-center text-2xl text-black">Agregar Billetera</h2>
        <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
          <div className="mx-5 flex items-center justify-between rounded bg-gray-100 p-2 text-slate-800">
            <FilePenLine className="md:mx-5" />
            <input
              type="text"
              name="name"
              className="mx-1 flex-1 bg-transparent outline-none md:mx-5"
              placeholder="Ingrese un nombre de billetera"
              required
            />
          </div>
          <div className="mx-5 flex items-center justify-between rounded bg-gray-100 p-2 text-slate-800">
            <DollarSign className="md:mx-5" />
            <input
              type="number"
              name="amount"
              className="mx-1 flex-1 bg-transparent outline-none md:mx-5"
              placeholder="Ingrese un monto"
              required
            />
          </div>
          <div className="mx-5 mt-5 flex justify-between">
            <Button variant="primary">Agregar</Button>
            <Button variant="secondary" onClick={() => navigate('/control-de-gastos/transaction')}>
              Transferencias
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

import { useParams } from 'react-router'

export function Wallet() {
  const { id } = useParams()

  return <div>Wallet: {id}</div>
}

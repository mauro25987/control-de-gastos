interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant: 'primary' | 'secondary' | 'danger'
}

const buttonVariant = {
  primary: 'bg-blue-500  hover:bg-blue-700',
  secondary: 'bg-gray-500 hover:bg-gray-700',
  danger: 'bg-red-500 hover:bg-red-700',
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...res }) => {
  return (
    <button
      {...res}
      className={`${res.className} ${buttonVariant[variant]} rounded px-4 py-2 font-bold text-white`}
    >
      {children}
    </button>
  )
}

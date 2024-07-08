type Props = {
  className?: string
}

const Spinner = ({ className = 'text-neutral-500' }: Props) => {
  return (
    <div
      className={`${className} border-current border-r-transparent inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid align-[-0.125em] text-neutral-400 motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role='status'>
      <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
        Loading...
      </span>
    </div>
  )
}

export default Spinner

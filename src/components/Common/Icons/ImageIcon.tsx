interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number
}

export const ImageIcon = ({ width = 100, className, ...props }: Props) => {
  if (typeof width !== 'number') throw new Error('width must be a number')
  const height = (width * 100) / 100

  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill='none'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g
        id='SVGRepo_tracerCarrier'
        strokeLinecap='round'
        strokeLinejoin='round'></g>
      <g id='SVGRepo_iconCarrier'>
        {' '}
        <rect width='24' height='24' fill='white'></rect>{' '}
        <path
          d='M21 16V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V18M21 16V4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V18M21 16L15.4829 12.3219C15.1843 12.1228 14.8019 12.099 14.4809 12.2595L3 18'
          stroke='currentColor'
          strokeLinejoin='round'></path>{' '}
        <circle
          cx='8'
          cy='9'
          r='2'
          stroke='currentColor'
          strokeLinejoin='round'></circle>{' '}
      </g>
    </svg>
  )
}

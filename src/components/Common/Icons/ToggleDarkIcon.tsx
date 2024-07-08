interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number
}

export const ToggleDarkIcon = ({ width = 20, className, ...props }: Props) => {
  if (typeof width !== 'number') throw new Error('width must be a number')
  const height = (width * 20) / 20

  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill='currentColor'
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z'></path>
    </svg>
  )
}

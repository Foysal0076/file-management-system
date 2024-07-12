interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number
}

export const LineIcon = ({ width = 24, className, ...props }: Props) => {
  if (typeof width !== 'number') throw new Error('width must be a number')
  const height = (width * 24) / 24

  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <line x1='4' y1='12' x2='20' y2='12' strokeWidth='2' />
    </svg>
  )
}

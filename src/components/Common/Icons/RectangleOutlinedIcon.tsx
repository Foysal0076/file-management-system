interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number
}

export const RectangleOutlinedIcon = ({
  width = 24,
  className,
  ...props
}: Props) => {
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
      <rect x='3' y='3' width='18' height='18' strokeWidth='2' />
    </svg>
  )
}

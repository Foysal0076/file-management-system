interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number
}

export const CircleOutlinedIcon = ({
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
      <circle cx='12' cy='12' r='9' strokeWidth='2' />
    </svg>
  )
}

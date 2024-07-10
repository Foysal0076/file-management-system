interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number
}

export const UploadCloudIcon = ({
  width = 100,
  className,
  ...props
}: Props) => {
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
        <path
          d='M12 9.5V15.5M12 9.5L10 11.5M12 9.5L14 11.5M8.4 19C5.41766 19 3 16.6044 3 13.6493C3 11.2001 4.8 8.9375 7.5 8.5C8.34694 6.48637 10.3514 5 12.6893 5C15.684 5 18.1317 7.32251 18.3 10.25C19.8893 10.9449 21 12.6503 21 14.4969C21 16.9839 18.9853 19 16.5 19L8.4 19Z'
          stroke='#000000'
          strokeWidth='0.4800000000000001'
          strokeLinecap='round'
          strokeLinejoin='round'></path>{' '}
      </g>
    </svg>
  )
}

interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number
}

export const EraserIcon = ({ width = 25, className, ...props }: Props) => {
  if (typeof width !== 'number') throw new Error('width must be a number')
  const height = (width * 23) / 25

  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill='currentColor'
      viewBox='0 0 17.093 16.301'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <path
        id='Path_153'
        fill='currentColor'
        fill-rule='evenodd'
        d='M8.319,8.378l6.014-6.535a.4.4,0,0,0-.024-.577L13.155.111a.4.4,0,0,0-.553,0L6.066,6.125a.4.4,0,0,0,0,.577L7.742,8.378a.4.4,0,0,0,.577,0Zm-3.44-.89,2.093,2.1a.8.8,0,0,1,.249.457v.393a3.208,3.208,0,0,1-.938,2.277,6.223,6.223,0,0,1-4.739,1.732,2.326,2.326,0,0,1-1.427-.481.4.4,0,0,1-.048-.505,4.772,4.772,0,0,0,.714-2.609A3.626,3.626,0,0,1,1.744,8.17a3.208,3.208,0,0,1,2.269-.938,3.134,3.134,0,0,1,.393,0A.874.874,0,0,1,4.879,7.488Z'></path>
    </svg>
  )
}

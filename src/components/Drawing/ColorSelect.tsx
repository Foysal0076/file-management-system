import { Typography } from '@mui/material'
import clsx from 'clsx'

import { useCanvasContext } from '@/context/CanvasContext'
import { ToolbarPositions } from '@/utils/constants/common'

const ColorSelect = () => {
  const { drawingColor, toolbarPosition, setDrawingColor, colorList } =
    useCanvasContext()

  const isPickedColor = drawingColor.startsWith('#')
  const isRight = toolbarPosition === ToolbarPositions.RIGHT
  const isLeft = toolbarPosition === ToolbarPositions.LEFT
  const isTop = toolbarPosition === ToolbarPositions.TOP

  return (
    <div
      className={clsx(
        `flex gap-4`,
        { 'max-w-[17rem] flex-row': isTop },
        { 'xl:flex-col': isLeft || isRight }
      )}>
      <Typography>Colors</Typography>
      <ul className='colors flex justify-between gap-2'>
        {colorList.map((color) => (
          <li key={color} className=''>
            <button
              className={clsx('option', {
                selected: drawingColor === color,
              })}
              style={{ backgroundColor: color }}
              onClick={() => setDrawingColor(color)}
            />
          </li>
        ))}
        <li
          className={clsx('option rounded-full', {
            selected: isPickedColor,
          })}
          style={{
            backgroundColor: isPickedColor ? drawingColor : '#4A98F7',
          }}>
          <input
            className='opacity-0'
            type='color'
            defaultValue={'#4A98F7'}
            onChange={(e) => setDrawingColor(e.target.value)}
          />
        </li>
      </ul>
    </div>
  )
}

export default ColorSelect

import { Typography } from '@mui/material'
import clsx from 'clsx'

import {
  CircleOutlinedIcon,
  LineIcon,
  RectangleOutlinedIcon,
  TriangleOutlinedIcon,
} from '@/components/Common/Icons'
import { useCanvasContext } from '@/context/CanvasContext'
import { drawCircle } from '@/utils/canvas/shapes/drawCircle'
import { drawLine } from '@/utils/canvas/shapes/drawLine'
import { drawRectangle } from '@/utils/canvas/shapes/drawRectangle'
import { drawTriangle } from '@/utils/canvas/shapes/drawTriangle'
import { ToolbarPositions } from '@/utils/constants/common'

const ShapeSelect = () => {
  const {
    canvas,
    toolbarPosition,
    drawingColor,
    drawingThickness,
    drawingFill,
  } = useCanvasContext()

  const isRight = toolbarPosition === ToolbarPositions.RIGHT
  const isLeft = toolbarPosition === ToolbarPositions.LEFT
  const isTop = toolbarPosition === ToolbarPositions.TOP

  return (
    <div
      className={clsx(`flex flex-wrap gap-4`, {
        'flex-row items-center': isTop,
        'xl:flex-col': isLeft || isRight,
      })}>
      <Typography>Shapes</Typography>

      <button
        className='flex items-center gap-2 text-neutral-200  hover:text-primary-500'
        onClick={() =>
          drawRectangle(canvas, drawingColor, drawingThickness, drawingFill)
        }>
        <RectangleOutlinedIcon />
        Rectangle
      </button>
      <button
        className='flex items-center gap-2 text-neutral-200 hover:text-primary-500'
        onClick={() =>
          drawCircle(canvas, drawingColor, drawingThickness, drawingFill)
        }>
        <CircleOutlinedIcon />
        Circle
      </button>
      <button
        className='flex items-center gap-2 text-neutral-200 hover:text-primary-500'
        onClick={() =>
          drawTriangle(canvas, drawingColor, drawingThickness, drawingFill)
        }>
        <TriangleOutlinedIcon />
        Triangle
      </button>

      <button
        className='flex items-center gap-2 text-neutral-200 hover:text-primary-500'
        onClick={() => drawLine(canvas, drawingColor, drawingThickness)}>
        <LineIcon />
        Line
      </button>
    </div>
  )
}

export default ShapeSelect

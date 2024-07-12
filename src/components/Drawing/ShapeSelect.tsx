import { Typography } from '@mui/material'

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

const ShapeSelect = () => {
  const { canvas, drawingColor, drawingThickness, drawingFill } =
    useCanvasContext()

  return (
    <div className={`flex flex-col gap-4 `}>
      <Typography>Shapes</Typography>
      <div className='flex flex-col gap-4'>
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
    </div>
  )
}

export default ShapeSelect

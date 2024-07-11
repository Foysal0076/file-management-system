import * as fabric from 'fabric'

import { DrawingColor, DrawingFill } from '@/components/Drawing/drawing.types'
import { DrawingFills } from '@/utils/constants/common'

export const drawTriangle = (
  canvas: fabric.Canvas | null,
  drawingColor: DrawingColor,
  strokeWidth: number,
  drawingFill: DrawingFill
) => {
  if (!canvas) return
  const fillColor =
    drawingFill === DrawingFills.SOLID ? drawingColor : 'transparent'

  const triangle = new fabric.Triangle({
    id: 'triangle',
    top: 150,
    left: 150,
    width: 100,
    height: 100,
    fill: fillColor,
    stroke: drawingColor,
    strokeWidth: strokeWidth,
    objectCaching: false,
  })

  // Render Rectangle on Canvas
  canvas.add(triangle)
}

import * as fabric from 'fabric'

import { DrawingColor, DrawingFill } from '@/components/Drawing/drawing.types'
import { DrawingFills } from '@/utils/constants/common'

export const drawRectangle = (
  canvas: fabric.Canvas | null,
  drawingColor: DrawingColor,
  strokeWidth: number,
  drawingFill: DrawingFill
) => {
  if (!canvas) return
  const fillColor =
    drawingFill === DrawingFills.SOLID ? drawingColor : 'transparent'

  const rect = new fabric.Rect({
    id: 'rectangle',
    top: (canvas.height - 50) * Math.random(),
    left: (canvas.width - 50) * Math.random(),
    width: 100,
    height: 100,
    fill: fillColor,
    stroke: drawingColor,
    strokeWidth: strokeWidth,
    objectCaching: false,
    rx: 1, // radius
    ry: 1, // radius
  })

  // Render Rectangle on Canvas
  canvas.add(rect)
}

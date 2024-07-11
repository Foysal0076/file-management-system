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
    width: 50,
    height: 50,
    fill: fillColor,
    stroke: drawingColor,
    strokeWidth: strokeWidth,
    objectCaching: false,
    padding: 10,
    rx: 2, // radius
    ry: 2, // radius
  })

  // Render Rectangle on Canvas
  canvas.add(rect)
}

import * as fabric from 'fabric'

import { DrawingColor } from '@/components/Drawing/drawing.types'

export const drawLine = (
  canvas: fabric.Canvas | null,
  drawingColor: DrawingColor,
  strokeWidth: number
) => {
  if (!canvas) return
  const line = new fabric.Line([50, 100, 200, 200], {
    id: 'line',
    fill: drawingColor,
    stroke: drawingColor,
    objectCaching: false,
    strokeWidth: strokeWidth,
  })

  // Render Rectangle on Canvas
  canvas.add(line)
}

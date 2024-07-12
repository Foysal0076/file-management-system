import * as fabric from 'fabric'

import { DrawingColor, DrawingFill } from '@/components/Drawing/drawing.types'
import { DrawingFills } from '@/utils/constants/common'

export const drawCircle = (
  canvas: fabric.Canvas | null,
  drawingColor: DrawingColor,
  strokeWidth: number,
  drawingFill: DrawingFill
) => {
  if (!canvas) return
  const canvasCenter = canvas.getCenterPoint()
  const fillColor =
    drawingFill === DrawingFills.SOLID ? drawingColor : 'transparent'

  const circle = new fabric.Circle({
    id: 'circle',
    top: canvasCenter.y,
    left: canvasCenter.x,
    radius: 50,
    originX: 'center',
    originY: 'center',
    fill: fillColor,
    stroke: drawingColor,
    strokeWidth: strokeWidth,
    objectCaching: false,
    padding: 10,
    cornerColor: drawingColor,
    cornerStyle: 'circle',
    cornerStrokeColor: drawingColor,
    borderDashArray: [5, 5],
    borderColor: drawingColor,
    transparentCorners: true,
    lockRotation: true, // can not rotate
    erasable: false, // can not erase it by erase tool-brush...
  })

  // Render Circle on Canvas
  canvas.add(circle)
}

import * as fabric from 'fabric'

import { DrawingColor } from '@/components/Drawing/drawing.types'

export const drawingBrush = (
  canvas: fabric.Canvas | null,
  drawingColor: DrawingColor,
  strokeWidth: number
) => {
  // fabric.PencilBrush.prototype.globalCompositeOperation = "source-over";

  // SprayBrush
  // CircleBrush
  // PencilBrush
  // PatternBrush
  if (!canvas) return
  canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
  canvas.freeDrawingBrush.color = drawingColor
  canvas.freeDrawingBrush.width = strokeWidth
  canvas.isDrawingMode = true // very very important...

  // canvas.on('mouse:move', (object) => {
  //   canvas.setCursor('grab');
  //   canvas.renderAll();
  //   const drawLine = new fabric.Point(object.e.movementX, object.e.movementY);
  //   canvas.relativePan(drawLine);
  // });

  canvas.on('mouse:up', () => (canvas.isDrawingMode = false))
}

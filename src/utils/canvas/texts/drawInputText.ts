import * as fabric from 'fabric'

import { DrawingColor } from '@/components/Drawing/drawing.types'

export const drawInputText = (
  canvas: fabric.Canvas | null,
  drawingColor: DrawingColor,
  userInputText: string = 'Text',
  fontStyles: {
    fontFamily: string
    fontSize: number
    fontWeight: string
    fontStyle: string
  } = {
    fontFamily: 'Roboto',
    fontSize: 50,
    fontWeight: 'normal',
    fontStyle: 'normal',
  }
) => {
  if (!canvas) return
  // This text is editable
  const text = new fabric.IText(userInputText, {
    editable: true,
    left: (canvas.width - 50) * Math.random(),
    top: (canvas.height - 50) * Math.random(),
    fill: drawingColor,
    ...fontStyles,
  })

  canvas.add(text)
}

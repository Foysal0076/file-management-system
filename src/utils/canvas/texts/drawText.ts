import * as fabric from 'fabric'

import { DrawingColor } from '@/components/Drawing/drawing.types'

export const drawText = (
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

  // This text is not editable
  const text = new fabric.FabricText(userInputText, {
    id: 'text',
    top: 150,
    left: 150,
    fill: drawingColor,
    ...fontStyles,
  })

  canvas.set({ hoverCursor: 'text' })

  canvas.add(text)
}

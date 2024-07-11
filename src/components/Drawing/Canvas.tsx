import * as fabric from 'fabric'
import { forwardRef, useLayoutEffect, useRef, useState } from 'react'

import {
  DrawingColor,
  DrawingFill,
  DrawingMode,
} from '@/components/Drawing/drawing.types'
import DrawingToolbar from '@/components/Drawing/DrawingToolbar'
import {
  DrawingFills,
  DrawingModes,
  DrawingTools,
} from '@/utils/constants/common'

export const Canvas = forwardRef<
  fabric.Canvas,
  { onLoad?(canvas: fabric.Canvas): void }
>(({ onLoad }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  const [drawingMode, setDrawingMode] = useState<DrawingMode>('free')
  const [drawingColor, setDrawingColor] = useState<DrawingColor>('black')
  const [drawingThickness, setDrawingThickness] = useState<number>(4)
  const [drawingFill, setDrawingFill] = useState<DrawingFill>(
    DrawingFills.SOLID
  )
  const [drawingTool, setDrawingTool] = useState<'select' | 'draw' | 'erase'>(
    'draw'
  )
  const [isDrawing, setIsDrawing] = useState(false)
  const [startPointer, setStartPointer] = useState<{
    x: number
    y: number
  } | null>(null)
  const [currentShape, setCurrentShape] = useState<fabric.Object | null>(null)

  const onChangeDrawingMode = (mode: DrawingMode) => {
    setDrawingMode(mode)
  }

  const onChangeDrawingColor = (color: DrawingColor) => {
    setDrawingColor(color)
  }

  const onChangeDrawingTool = (tool: 'select' | 'draw' | 'erase') => {
    setDrawingTool(tool)
  }

  const onChangeDrawingThickness = (thickness: number) => {
    setDrawingThickness(thickness)
  }

  const onChangeDrawingFill = (fill: DrawingFill) => {
    setDrawingFill(fill)
  }

  const onClearCanvas = () => {
    const canvas: any = canvasRef.current
    if (canvas) {
      canvas.getObjects().forEach((obj: any) => {
        canvas.remove(obj)
      })
    }
  }

  const onUndo = () => {
    const canvas: any = canvasRef.current
    if (canvas) {
      const objects = canvas.getObjects()
      if (objects.length > 0) {
        canvas.remove(objects[objects.length - 1])
      }
    }
  }

  const onSave = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const dataURL = canvas.toDataURL()
      // Trigger download
      const link = document.createElement('a')
      link.download = 'canvas-image.png'
      link.href = dataURL
      document.body.appendChild(link) // Required for Firefox
      link.click()
      document.body.removeChild(link) // Clean up
    }
  }

  useLayoutEffect(() => {
    if (!canvasRef.current) {
      return
    }
    const canvas = new fabric.Canvas(canvasRef.current)
    if (typeof ref === 'function') {
      ref(canvas)
    } else if (typeof ref === 'object' && ref) {
      ref.current = canvas
    }

    canvas.add(
      new fabric.Rect({
        left: 100,
        top: 100,
        width: 100,
        height: 50,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 2,
      })
    )

    // Ensure freeDrawingBrush is initialized
    if (!canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
    }

    // Apply initial settings
    canvas.isDrawingMode = drawingTool === DrawingTools.DRAW
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = drawingColor
      canvas.freeDrawingBrush.width = drawingThickness
    }

    const handleToolChange = () => {
      if (!canvas.freeDrawingBrush) return
      if (drawingTool === DrawingTools.DRAW) {
        canvas.isDrawingMode = true
        canvas.freeDrawingBrush.color = drawingColor
      } else {
        canvas.isDrawingMode = false
        if (drawingTool === DrawingTools.ERASE) {
          canvas.freeDrawingBrush.color = '#ffffff' // Assuming white as background
        }
      }
    }

    const startDrawingShape = (
      shape: DrawingMode,
      pointer: { x: number; y: number }
    ) => {
      let obj: fabric.Object | null = null
      const options = {
        fill: drawingFill === DrawingFills.SOLID ? drawingColor : 'transparent',
        stroke: '#000',
        strokeWidth: drawingThickness,
        drawingStrokeColor: drawingColor,
      }
      // console.log({ shape, options, pointer })
      switch (shape) {
        case DrawingModes.RECTANGLE:
          obj = new fabric.Rect({
            left: pointer.x,
            top: pointer.y,
            width: 0,
            height: 0,
            ...options,
          })
          break
        case DrawingModes.CIRCLE:
          obj = new fabric.Circle({
            left: pointer.x,
            top: pointer.y,
            radius: 0,
            ...options,
          })
          break
        case DrawingModes.TRIANGLE:
          obj = new fabric.Triangle({
            left: pointer.x,
            top: pointer.y,
            width: 0,
            height: 0,
            ...options,
          })
          break
        case DrawingModes.LINE:
          obj = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
            stroke: drawingColor,
            strokeWidth: drawingThickness,
          })
          break
        default:
          return null
      }
      if (obj) {
        canvas.add(obj)
        setCurrentShape(obj)
      }
      return obj
    }

    const updateDrawingShape = (
      shape: fabric.Object,
      pointer: { x: number; y: number }
    ) => {
      // console.log({ startPointer, pointer })
      if (!startPointer) return
      switch (shape.type) {
        case 'rect':
          ;(shape as fabric.Rect).set({
            width: Math.abs(pointer.x - startPointer.x),
            height: Math.abs(pointer.y - startPointer.y),
            left: Math.min(pointer.x, startPointer.x),
            top: Math.min(pointer.y, startPointer.y),
          })
          break
        case 'circle':
          ;(shape as fabric.Circle).set({
            radius:
              Math.sqrt(
                Math.pow(pointer.x - startPointer.x, 2) +
                  Math.pow(pointer.y - startPointer.y, 2)
              ) / 2,
            left: Math.min(pointer.x, startPointer.x),
            top: Math.min(pointer.y, startPointer.y),
          })
          break
        case 'triangle':
          ;(shape as fabric.Triangle).set({
            width: Math.abs(pointer.x - startPointer.x),
            height: Math.abs(pointer.y - startPointer.y),
            left: Math.min(pointer.x, startPointer.x),
            top: Math.min(pointer.y, startPointer.y),
          })
          break
        case 'line':
          ;(shape as fabric.Line).set({
            x2: pointer.x,
            y2: pointer.y,
          })
          break
        default:
          break
      }
      shape.setCoords()
      canvas.renderAll()
    }

    // Event listener for shape drawing
    canvas.on('mouse:down', (options) => {
      console.log('mouse down')
      // if (drawingMode && drawingMode !== 'free') {
      const pointer = canvas.getViewportPoint(options.e)
      setStartPointer(pointer)
      const shape = startDrawingShape(drawingMode, pointer)
      if (shape) setIsDrawing(true)
      // }
    })

    canvas.on('mouse:move', (options) => {
      console.log('mouse move')
      if (isDrawing && currentShape) {
        // console.log({ isDrawing, type: currentShape.type })
        const pointer = canvas.getViewportPoint(options.e)
        updateDrawingShape(currentShape, pointer)
      }
    })

    canvas.on('mouse:up', () => {
      console.log('mouse up called')
      if (isDrawing) {
        setIsDrawing(false)
        setCurrentShape(null)
        setStartPointer(null)
      }
    })

    handleToolChange()

    // Cleanup
    return () => {
      if (typeof ref === 'function') {
        ref(null)
      } else if (typeof ref === 'object' && ref) {
        ref.current = null
      }

      canvas.dispose()
    }
  }, [
    canvasRef,
    ref,
    drawingTool,
    drawingColor,
    drawingThickness,
    drawingMode,
    drawingFill,
    isDrawing,
    startPointer,
    currentShape,
  ])
  console.log({ isDrawing })
  return (
    <>
      <DrawingToolbar
        drawingMode={drawingMode}
        drawingColor={drawingColor}
        drawingTool={drawingTool}
        drawingThickness={drawingThickness}
        drawingFill={drawingFill}
        onChangeDrawingMode={onChangeDrawingMode}
        onChangeDrawingColor={onChangeDrawingColor}
        onChangeDrawingTool={onChangeDrawingTool}
        onChangeDrawingThickness={onChangeDrawingThickness}
        onChangeDrawingFill={onChangeDrawingFill}
        onClearCanvas={onClearCanvas}
        onUndo={onUndo}
        onSave={onSave}
      />
      <canvas
        ref={canvasRef}
        width={1000}
        height={600}
        className='flex rounded-sm border border-neutral-50'
      />
    </>
  )
})

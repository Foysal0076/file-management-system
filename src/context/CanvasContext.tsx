'use client'
import * as fabric from 'fabric'
import { createContext, ReactNode, useContext, useRef, useState } from 'react'

import {
  DrawingColor,
  DrawingFill,
  DrawingMode,
} from '@/components/Drawing/drawing.types'
import {
  DrawingColors,
  DrawingFills,
  DrawingModes,
  DrawingTools,
} from '@/utils/constants/common'

interface CanvasContextType {
  fabricRef: any
  canvas: fabric.Canvas | null
  setCanvas: (canvas: fabric.Canvas | null) => void
  drawingMode: DrawingMode
  setDrawingMode: (mode: DrawingMode) => void
  drawingColor: DrawingColor
  setDrawingColor: (color: DrawingColor) => void
  drawingThickness: number
  setDrawingThickness: (thickness: number) => void
  drawingFill: DrawingFill
  setDrawingFill: (fill: DrawingFill) => void
  drawingTool: 'select' | 'draw' | 'erase'
  setDrawingTool: (tool: 'select' | 'draw' | 'erase') => void
  userInputText: string
  setUserInputText: (text: string) => void
  objectSelectForDelete: boolean
  setObjectSelectForDelete: (select: boolean) => void
  colorList: string[]
}
const colorList = Object.values(DrawingColors)
const CanvasContext = createContext<CanvasContextType>({
  fabricRef: null,
  canvas: null,
  setCanvas: () => {},
  drawingMode: DrawingModes.FREE,
  drawingColor: DrawingColors.BLACK,
  drawingThickness: 5,
  drawingFill: DrawingFills.HOLLOW,
  drawingTool: DrawingTools.DRAW,
  userInputText: '',
  objectSelectForDelete: false,
  setUserInputText: () => {},
  setObjectSelectForDelete: () => {},
  setDrawingMode: () => {},
  setDrawingColor: () => {},
  setDrawingThickness: () => {},
  setDrawingFill: () => {},
  setDrawingTool: () => {},
  colorList,
})

interface CanvasContextProviderProps {
  children: ReactNode
}

export const CanvasContextProvider = ({
  children,
}: CanvasContextProviderProps) => {
  const fabricRef = useRef<fabric.Canvas | null>(null)
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  const [userInputText, setUserInputText] = useState('')
  const [objectSelectForDelete, setObjectSelectForDelete] = useState(false)
  const [drawingMode, setDrawingMode] = useState<DrawingMode>(DrawingModes.FREE)
  const [drawingColor, setDrawingColor] = useState<DrawingColor>(
    DrawingColors.BLACK
  )
  const [drawingThickness, setDrawingThickness] = useState<number>(2)
  const [drawingFill, setDrawingFill] = useState<DrawingFill>(
    DrawingFills.HOLLOW
  )
  const [drawingTool, setDrawingTool] = useState<'select' | 'draw' | 'erase'>(
    'draw'
  )

  const values = {
    fabricRef,
    canvas,
    setCanvas,
    drawingMode,
    setDrawingMode,
    drawingColor,
    setDrawingColor,
    drawingThickness,
    setDrawingThickness,
    drawingFill,
    setDrawingFill,
    drawingTool,
    setDrawingTool,
    userInputText,
    setUserInputText,
    objectSelectForDelete,
    setObjectSelectForDelete,
    colorList,
  }

  return (
    <CanvasContext.Provider value={values}>{children}</CanvasContext.Provider>
  )
}

export const useCanvasContext = () => useContext(CanvasContext)

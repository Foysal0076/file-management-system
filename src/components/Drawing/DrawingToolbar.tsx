'use client'

import { Typography } from '@mui/material'
import clsx from 'clsx'
import { useSelector } from 'react-redux'

import {
  DrawingColor,
  DrawingFill,
  DrawingMode,
  DrawingTool,
} from '@/components/Drawing/drawing.types'
import { getToolbarPosition } from '@/redux/slice/stateSlice'
import { DrawingModes } from '@/utils/constants/common'

type Props = {
  drawingMode: DrawingMode | null
  drawingColor: DrawingColor
  drawingTool: 'select' | 'draw' | 'erase'
  drawingThickness: number
  drawingFill: DrawingFill
  onChangeDrawingMode: (shape: DrawingMode) => void
  onChangeDrawingColor: (color: DrawingColor) => void
  onChangeDrawingTool: (tool: DrawingTool) => void
  onChangeDrawingThickness: (thickness: number) => void
  onChangeDrawingFill: (fill: DrawingFill) => void
  onClearCanvas: () => void
  onUndo: () => void
  onSave: () => void
}

const DrawingToolbar = ({
  drawingMode,
  drawingColor,
  drawingFill,
  drawingThickness,
  drawingTool,
  onChangeDrawingColor,
  onChangeDrawingFill,
  onChangeDrawingMode,
  onChangeDrawingThickness,
  onChangeDrawingTool,
  onClearCanvas,
  onSave,
  onUndo,
}: Props) => {
  const toolbarPosition = useSelector(getToolbarPosition)

  const isSelected = (mode: DrawingMode) => {
    return drawingMode === mode
  }
  console.log({ drawingMode })
  return (
    <div
      className={`flex flex-col gap-4 rounded-sm border border-neutral-50 p-4`}>
      <Typography>Shapes</Typography>
      <div className='flex flex-col gap-4'>
        <button
          className={clsx('flex items-center gap-2 text-neutral-200', {
            'text-primary-500': isSelected(DrawingModes.RECTANGLE),
          })}
          onClick={() => onChangeDrawingMode(DrawingModes.RECTANGLE)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <rect x='3' y='3' width='18' height='18' strokeWidth='2' />{' '}
            {/* Rectangle */}
          </svg>
          Rectangle
        </button>
        <button
          className={clsx('flex items-center gap-2 text-neutral-200', {
            'text-primary-500': isSelected(DrawingModes.CIRCLE),
          })}
          onClick={() => onChangeDrawingMode(DrawingModes.CIRCLE)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <circle cx='12' cy='12' r='9' strokeWidth='2' /> {/* Circle */}
          </svg>
          Circle
        </button>
        <button
          className={clsx('flex items-center gap-2 text-neutral-200', {
            'text-primary-500': isSelected(DrawingModes.TRIANGLE),
          })}
          onClick={() => onChangeDrawingMode(DrawingModes.TRIANGLE)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <polygon points='12 2, 22 22, 2 22' strokeWidth='2' />{' '}
            {/* Triangle */}
          </svg>
          Triangle
        </button>

        <button
          className={clsx('flex items-center gap-2 text-neutral-200', {
            'text-primary-500': isSelected(DrawingModes.LINE),
          })}
          onClick={() => onChangeDrawingMode(DrawingModes.LINE)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <line x1='4' y1='12' x2='20' y2='12' strokeWidth='2' /> {/* Line */}
          </svg>
          Line
        </button>
      </div>
    </div>
  )
}

export default DrawingToolbar
